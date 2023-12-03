import { Duration, RemovalPolicy, SecretValue, Stack } from "aws-cdk-lib";
import { IVpc, Port, SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  Cluster,
  ContainerImage,
  FargatePlatformVersion,
  FargateService,
  FargateTaskDefinition,
  ICluster,
  LogDriver,
  PropagatedTagSource,
} from "aws-cdk-lib/aws-ecs";
import { FileSystem, LifecyclePolicy } from "aws-cdk-lib/aws-efs";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Credentials, DatabaseClusterEngine, ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { StaticHosting } from "./StaticHosting";
import { WordpressAdminProps, WordpressDatabaseProps } from "./types";
import { WordpressDockerImage } from "./WordpressDockerImage";

export interface EcsTaskProps {
  readonly siteId: string;
  readonly hostedZone: IHostedZone;
  readonly fullyQualifiedSiteName: string;
  readonly staticHosting: StaticHosting;
  readonly wordpressDockerImage: WordpressDockerImage;
  readonly wordpressAdminProps: WordpressAdminProps;
  readonly wordpressDatabaseProps?: WordpressDatabaseProps;

  readonly vpc?: IVpc;
  readonly ecsCluster?: ICluster;
}

export class EcsTask extends Construct {
  public readonly fileSystem: FileSystem;
  public readonly databaseCluster: ServerlessCluster;
  public readonly taskDefinition: FargateTaskDefinition;
  public readonly fargateService: FargateService;

  constructor(scope: Construct, id: string, props: EcsTaskProps) {
    super(scope, id);

    const {
      siteId,
      fullyQualifiedSiteName,
      hostedZone,
      vpc = new Vpc(this, "Vpc", {
        vpcName: `${siteId}-vpc`,
        maxAzs: 2, // 2 AZs are required for Aurora
        natGateways: 0, // NAT Gateways are ~$1/day
      }),
      ecsCluster = new Cluster(this, "Cluster", {
        clusterName: `${siteId}-cluster`,
        vpc,
        enableFargateCapacityProviders: true,
      }),
      staticHosting,
      wordpressDockerImage,
      wordpressAdminProps,
      wordpressDatabaseProps = {},
    } = props;
    const { bucket, distribution } = staticHosting;
    const { dockerImageAsset, containerCpu, containerMemory, wordpressMemoryLimit } = wordpressDockerImage;
    const {
      email: adminEmail,
      username: adminUsername = "supervisor",
      password: adminPassword = "changeme",
      domainPrefix = "admin-",
      run: runWpAdmin = true,
      ecsOverrides = {},
    } = wordpressAdminProps;
    const {
      username: databaseUsername = "wp_master",
      password: databasePassword = "changeme",
      databaseOverrides = {},
    } = wordpressDatabaseProps;
    const { taskDefinitionOverrides = {}, containerOverrides = {}, serviceOverrides = {} } = ecsOverrides;

    const fileSystem = new FileSystem(this, "FileSystem", {
      fileSystemName: `${siteId}-fs`,
      vpc,
      encrypted: true,
      enableAutomaticBackups: true,
      lifecyclePolicy: LifecyclePolicy.AFTER_7_DAYS,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // This is harder than it should be
    // https://github.com/aws/aws-cdk/issues/13442#issuecomment-1321150902
    const fileSystemAccessPoint = fileSystem.addAccessPoint("AccessPoint");
    fileSystemAccessPoint.node.addDependency(fileSystem);
    const fileSystemMountPolicy = new PolicyStatement({
      actions: ["elasticfilesystem:ClientMount", "elasticfilesystem:ClientWrite", "elasticfilesystem:ClientRootAccess"],
      resources: [fileSystemAccessPoint.accessPointArn, fileSystem.fileSystemArn],
    });

    const databaseCredentials = Credentials.fromPassword(
      databaseUsername,
      SecretValue.unsafePlainText(databasePassword)
    );
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
      ...databaseOverrides,
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
      ...taskDefinitionOverrides,
    });

    const wordpressDomain = `${domainPrefix}${fullyQualifiedSiteName}`;
    const taskContainer = taskDefinition.addContainer("wordpress", {
      containerName: "wordpress",
      image: ContainerImage.fromDockerImageAsset(dockerImageAsset),
      environment: {
        ECS_ENABLE_CONTAINER_METADATA: "true",
        WORDPRESS_DB_HOST: database.clusterEndpoint.hostname,
        WORDPRESS_DB_USER: databaseCredentials.username,
        WORDPRESS_DB_NAME: "wordpress",
        WPSTATIC_DEST: `https://${fullyQualifiedSiteName}`,
        WPSTATIC_REGION: Stack.of(staticHosting).region,
        WPSTATIC_BUCKET: bucket.bucketName,
        WPSTATIC_CLOUDFRONT_DISTRIBUTION_ID: distribution.distributionId,
        WPSTATIC_CLOUDFRONT_DISTRIBUTION_REGION: Stack.of(staticHosting).region,
        CONTAINER_DNS: wordpressDomain,
        CONTAINER_DNS_ZONE: hostedZone.hostedZoneId,
        WORDPRESS_ADMIN_USER: adminUsername,
        WORDPRESS_ADMIN_PASSWORD: adminPassword,
        WORDPRESS_ADMIN_EMAIL: adminEmail,
        WORDPRESS_DB_PASSWORD: databaseCredentials.password!.unsafeUnwrap(),
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
      ...containerOverrides,
    });
    taskContainer.addMountPoints({
      sourceVolume: "wordpress_persistent",
      containerPath: "/var/www/html",
      readOnly: false,
    });
    taskDefinition.addToTaskRolePolicy(
      new PolicyStatement({
        sid: "AllowRoute53Updates",
        actions: ["route53:ChangeResourceRecordSets"],
        resources: [`arn:aws:route53:::hostedzone/${hostedZone.hostedZoneId}`],
        conditions: {
          StringEquals: {
            "route53:ChangeResourceRecordSetsActions": ["UPSERT"],
            "route53:ChangeResourceRecordSetsNormalizedRecordNames": [wordpressDomain],
          },
        },
      })
    );
    taskDefinition.addToTaskRolePolicy(
      new PolicyStatement({
        actions: ["ec2:DescribeNetworkInterfaces"],
        resources: ["*"],
      })
    );
    taskDefinition.addToTaskRolePolicy(fileSystemMountPolicy);
    taskDefinition.addToExecutionRolePolicy(fileSystemMountPolicy);

    const serviceSg = new SecurityGroup(this, "ServiceSecurityGroup", {
      vpc,
    });
    const service = new FargateService(this, "Service", {
      serviceName: siteId,
      cluster: ecsCluster,
      taskDefinition,
      assignPublicIp: true,
      desiredCount: runWpAdmin ? 1 : 0,
      capacityProviderStrategies: [{ capacityProvider: "FARGATE_SPOT", base: 1, weight: 100 }],
      propagateTags: PropagatedTagSource.SERVICE,
      platformVersion: FargatePlatformVersion.LATEST,
      securityGroups: [serviceSg],
      ...serviceOverrides,
    });

    service.connections.allowToDefaultPort(database, "Allow connecting to the database");
    service.connections.allowFromAnyIpv4(Port.tcp(80), "Allow any IP to access the site");
    bucket.grantReadWrite(service.taskDefinition.taskRole);
    distribution.grantCreateInvalidation(service.taskDefinition.taskRole);
    fileSystem.connections.allowDefaultPortFrom(serviceSg); // reference the security group directly to avoid circular dependencies

    this.fileSystem = fileSystem;
    this.databaseCluster = database;
    this.taskDefinition = taskDefinition;
    this.fargateService = service;
  }
}
