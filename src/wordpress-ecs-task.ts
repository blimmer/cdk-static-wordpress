import { Duration, Stack } from "aws-cdk-lib";
import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Cluster,
  ContainerImage,
  FargatePlatformVersion,
  FargateService,
  FargateServiceProps,
  FargateTaskDefinition,
  FargateTaskDefinitionProps,
  ICluster,
  LogDriver,
  PropagatedTagSource,
  Secret,
} from "aws-cdk-lib/aws-ecs";
import { FileSystem, FileSystemProps, LifecyclePolicy } from "aws-cdk-lib/aws-efs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Credentials, DatabaseClusterEngine, ServerlessCluster, ServerlessClusterProps } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { StaticWordpressHosting } from "./static-wordpress-hosting";
import { WordpressContainer } from "./wordpress-container";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export interface IWordpressEcsTaskProps {
  siteId: string;
  fullyQualifiedSiteName: string;
  staticWordpressHosting: StaticWordpressHosting;
  wordpressContainer: WordpressContainer;
  runWpAdmin: boolean;

  vpc?: IVpc;
  ecsCluster?: ICluster;

  databaseClusterPropsOverrides?: Partial<ServerlessClusterProps>;
  efsOverrides?: Partial<FileSystemProps>;
  fargateServiceOverrides?: Partial<FargateServiceProps>;
  taskDefinitionOverrides?: Partial<FargateTaskDefinitionProps>;
}

export class WordpressEcsTask extends Construct {
  constructor(scope: Construct, id: string, props: IWordpressEcsTaskProps) {
    super(scope, id);

    const {
      siteId,
      fullyQualifiedSiteName,
      vpc = new Vpc(this, "Vpc", {
        maxAzs: 2, // 2 AZs are required for Aurora
        natGateways: 0, // NAT Gateways are ~$1/day
      }),
      ecsCluster = new Cluster(this, "Cluster", {
        clusterName: `${siteId}-cluster`,
        vpc,
        enableFargateCapacityProviders: true,
      }),
      databaseClusterPropsOverrides,
      staticWordpressHosting,
      wordpressContainer,
      efsOverrides,
      runWpAdmin,
      fargateServiceOverrides,
      taskDefinitionOverrides,
    } = props;
    const { bucket } = staticWordpressHosting;

    const fileSystem = new FileSystem(this, "FileSystem", {
      fileSystemName: `${siteId}-fs`,
      vpc,
      encrypted: true,
      enableAutomaticBackups: true,
      lifecyclePolicy: LifecyclePolicy.AFTER_7_DAYS,
      ...efsOverrides,
    });

    // This is harder than it should be
    // https://github.com/aws/aws-cdk/issues/13442#issuecomment-1321150902
    const fileSystemAccessPoint = fileSystem.addAccessPoint("AccessPoint");
    fileSystemAccessPoint.node.addDependency(fileSystem);
    const fileSystemMountPolicy = new PolicyStatement({
      actions: ["elasticfilesystem:ClientMount", "elasticfilesystem:ClientWrite", "elasticfilesystem:ClientRootAccess"],
      resources: [fileSystemAccessPoint.accessPointArn, fileSystem.fileSystemArn],
    });

    const databaseCredentials = Credentials.fromGeneratedSecret("wp_master");
    const database = new ServerlessCluster(this, "Database", {
      clusterIdentifier: `${siteId}`,
      engine: DatabaseClusterEngine.AURORA_MYSQL,
      defaultDatabaseName: "wordpress",
      credentials: databaseCredentials,
      enableDataApi: true,
      backupRetention: Duration.days(5),
      scaling: {
        autoPause: Duration.minutes(5),
        minCapacity: 1,
        maxCapacity: 1,
      },
      vpc,
      ...databaseClusterPropsOverrides,
    });

    const taskDefinition = new FargateTaskDefinition(this, "TaskDefinition", {
      family: `${siteId}_wordpress`,
      cpu: 256,
      memoryLimitMiB: 512,
      volumes: [
        {
          name: "wordpress_persistent",
          efsVolumeConfiguration: {
            fileSystemId: fileSystem.fileSystemId,
            transitEncryption: "ENABLED",
            authorizationConfig: {
              accessPointId: fileSystemAccessPoint.accessPointId,
            },
          },
        },
      ],
      // TODO
      ...taskDefinitionOverrides,
    });
    const taskContainer = taskDefinition.addContainer("wordpress", {
      containerName: "wordpress",
      image: ContainerImage.fromDockerImageAsset(wordpressContainer.dockerImageAsset),
      secrets: {
        WORDPRESS_DB_PASSWORD: Secret.fromSecretsManager(databaseCredentials.secret!),
      },
      environment: {
        ECS_ENABLE_CONTAINER_METADATA: "true",
        WORDPRESS_DB_HOST: database.clusterEndpoint.hostname,
        WORDPRESS_DB_USER: databaseCredentials.username,
        WORDPRESS_DB_NAME: "wordpress",
        WPSTATIC_DEST: fullyQualifiedSiteName,
        WPSTATIC_REGION: Stack.of(staticWordpressHosting).region,
        WPSTATIC_BUCKET: bucket.bucketName,
        CONTAINER_DNS: "${container_dns}",
        CONTAINER_DNS_ZONE: "${container_dns_zone}",
        WORDPRESS_ADMIN_USER: "${wordpress_admin_user}",
        WORDPRESS_ADMIN_PASSWORD: "${wordpress_admin_password}",
        WORDPRESS_ADMIN_EMAIL: "${wordpress_admin_email}",
        WP_MEMORY_LIMIT: "${wordpress_memory_limit}",
      },
      portMappings: [{ containerPort: 80, hostPort: 80 }],
      healthCheck: {
        retries: 10,
        command: ["CMD-SHELL", "curl -f http://localhost:80/ || exit 1"],
        timeout: Duration.seconds(5),
        interval: Duration.seconds(10),
        startPeriod: Duration.minutes(1),
      },
      logging: LogDriver.awsLogs({
        streamPrefix: "ecs",
        logRetention: RetentionDays.ONE_MONTH,
      }),
    });
    taskContainer.addMountPoints({
      sourceVolume: "wordpress_persistent",
      containerPath: "/var/www/html",
      readOnly: false,
    });
    taskDefinition.addToTaskRolePolicy(fileSystemMountPolicy);
    taskDefinition.addToExecutionRolePolicy(fileSystemMountPolicy);

    const service = new FargateService(this, "Service", {
      cluster: ecsCluster,
      taskDefinition,
      assignPublicIp: true,
      desiredCount: runWpAdmin ? 1 : 0,
      capacityProviderStrategies: [{ capacityProvider: "FARGATE_SPOT" }],
      propagateTags: PropagatedTagSource.SERVICE,
      platformVersion: FargatePlatformVersion.LATEST,
      ...fargateServiceOverrides,
    });
    service.connections.allowToDefaultPort(database);
    bucket.grantReadWrite(service.taskDefinition.taskRole);
  }
}
