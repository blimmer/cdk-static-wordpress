import { Duration, SecretValue, Stack } from "aws-cdk-lib";
import { IVpc, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
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
} from "aws-cdk-lib/aws-ecs";
import { FileSystem, FileSystemProps, LifecyclePolicy } from "aws-cdk-lib/aws-efs";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Credentials, DatabaseClusterEngine, ServerlessCluster, ServerlessClusterProps } from "aws-cdk-lib/aws-rds";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { StaticWordpressHosting } from "./static-wordpress-hosting";
import { WordpressAdminProps, WordpressDatabaseProps } from "./types";
import { WordpressContainer } from "./wordpress-container";

export interface IWordpressEcsTaskProps {
  siteId: string;
  hostedZone: IHostedZone;
  fullyQualifiedSiteName: string;
  staticWordpressHosting: StaticWordpressHosting;
  wordpressContainer: WordpressContainer;
  wordpressAdminProps: WordpressAdminProps;
  wordpressDatabaseProps?: WordpressDatabaseProps;
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
      hostedZone,
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
      wordpressAdminProps,
      wordpressDatabaseProps = {},
      efsOverrides,
      runWpAdmin,
      fargateServiceOverrides,
      taskDefinitionOverrides,
    } = props;
    const { bucket } = staticWordpressHosting;
    const { dockerImageAsset, containerCpu, containerMemory, wordpressMemoryLimit } = wordpressContainer;
    const {
      email: adminEmail,
      username: adminUsername = "supervisor",
      password: adminPassword = "changeme",
    } = wordpressAdminProps;
    const { username: databaseUsername = "wp_master", password: databasePassword = "changeme" } =
      wordpressDatabaseProps;

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

    const databaseCredentials = Credentials.fromPassword(databaseUsername, SecretValue.plainText(databasePassword));
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
      vpcSubnets: { subnetType: SubnetType.PRIVATE_ISOLATED },
      ...databaseClusterPropsOverrides,
    });

    const taskDefinition = new FargateTaskDefinition(this, "TaskDefinition", {
      family: `${siteId}_wordpress`,
      cpu: containerCpu,
      memoryLimitMiB: containerMemory,
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
      image: ContainerImage.fromDockerImageAsset(dockerImageAsset),
      environment: {
        ECS_ENABLE_CONTAINER_METADATA: "true",
        WORDPRESS_DB_HOST: database.clusterEndpoint.hostname,
        WORDPRESS_DB_USER: databaseCredentials.username,
        WORDPRESS_DB_NAME: "wordpress",
        WPSTATIC_DEST: fullyQualifiedSiteName,
        WPSTATIC_REGION: Stack.of(staticWordpressHosting).region,
        WPSTATIC_BUCKET: bucket.bucketName,
        CONTAINER_DNS: fullyQualifiedSiteName,
        CONTAINER_DNS_ZONE: hostedZone.hostedZoneId,
        WORDPRESS_ADMIN_USER: adminUsername,
        WORDPRESS_ADMIN_PASSWORD: adminPassword,
        WORDPRESS_ADMIN_EMAIL: adminEmail,
        WORDPRESS_DB_PASSWORD: (databaseCredentials.password as SecretValue).toString(),
        WP_MEMORY_LIMIT: wordpressMemoryLimit,
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
