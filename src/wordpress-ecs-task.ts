import { Duration } from "aws-cdk-lib";
import { IVpc, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  CfnService,
  Cluster,
  FargatePlatformVersion,
  FargateService,
  FargateServiceProps,
  ICluster,
  PropagatedTagSource,
  TaskDefinition,
  TaskDefinitionProps,
} from "aws-cdk-lib/aws-ecs";
import { FileSystem, FileSystemProps, LifecyclePolicy } from "aws-cdk-lib/aws-efs";
import { DatabaseClusterEngine, ServerlessCluster, ServerlessClusterProps } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { WordpressContainer } from "./wordpress-container";

export interface IWordpressEcsTaskProps {
  siteId: string;
  wordpressContainer: WordpressContainer;
  runWpAdmin: boolean;

  vpc?: IVpc;
  ecsCluster?: ICluster;

  databaseClusterPropsOverrides?: Partial<ServerlessClusterProps>;
  efsOverrides?: Partial<FileSystemProps>;
  fargateServiceOverrides?: Partial<FargateServiceProps>;
  taskDefinitionOverrides?: Partial<TaskDefinitionProps>;
}

export class WordpressEcsTask extends Construct {
  constructor(scope: Construct, id: string, props: IWordpressEcsTaskProps) {
    super(scope, id);

    const {
      siteId,
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
      wordpressContainer,
      efsOverrides,
      runWpAdmin,
      fargateServiceOverrides,
      taskDefinitionOverrides,
    } = props;

    const fileSystem = new FileSystem(this, "FileSystem", {
      fileSystemName: `${siteId}-fs`,
      vpc,
      encrypted: true,
      enableAutomaticBackups: true,
      lifecyclePolicy: LifecyclePolicy.AFTER_7_DAYS,
      ...efsOverrides,
    });

    const databaseSecurityGroup = new SecurityGroup(this, "DatabaseSecurityGroup", {
      securityGroupName: `${siteId}-db-sg`,
      vpc,
    });
    const database = new ServerlessCluster(this, "Database", {
      clusterIdentifier: `${siteId}`,
      engine: DatabaseClusterEngine.AURORA_MYSQL,
      defaultDatabaseName: "wordpress",
      credentials: {
        username: "wp_master",
      },
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

    const service = new FargateService(this, "Service", {
      cluster: ecsCluster,
      taskDefinition: new TaskDefinition(this, "TaskDefinition", {
        // TODO
        ...taskDefinitionOverrides,
      }),
      assignPublicIp: true,
      desiredCount: 1,
      capacityProviderStrategies: [{ capacityProvider: "FARGATE_SPOT" }],
      propagateTags: PropagatedTagSource.SERVICE,
      platformVersion: FargatePlatformVersion.LATEST,
      ...fargateServiceOverrides,
    });

    // https://github.com/aws/aws-cdk/issues/16562
    if (!runWpAdmin) {
      const cfnEcsService = service.node.defaultChild as CfnService;
      cfnEcsService.desiredCount = 0;
    }
  }
}
