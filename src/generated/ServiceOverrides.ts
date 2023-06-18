// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import { aws_ec2, aws_ecs, Duration } from 'aws-cdk-lib';

/**
 * ServiceOverrides
 */
export interface ServiceOverrides {
  /**
   * The subnets to associate with the service.
   * @default - Public subnets if `assignPublicIp` is set, otherwise the first available one of Private, Isolated, Public, in that order.
   * @stability stable
   */
  readonly vpcSubnets?: aws_ec2.SubnetSelection;
  /**
   * The security groups to associate with the service.
   * If you do not specify a security group, a new security group is created.
   * @default - A new security group is created.
   * @stability stable
   */
  readonly securityGroups?: Array<aws_ec2.ISecurityGroup>;
  /**
   * The platform version on which to run your service.
   * If one is not specified, the LATEST platform version is used by default. For more information, see
   * [AWS Fargate Platform Versions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html)
   * in the Amazon Elastic Container Service Developer Guide.
   * @default Latest
   * @stability stable
   */
  readonly platformVersion?: aws_ecs.FargatePlatformVersion;
  /**
   * Specifies whether the task's elastic network interface receives a public IP address.
   * If true, each task will receive a public IP address.
   * @default false
   * @stability stable
   */
  readonly assignPublicIp?: boolean;
  /**
   * The task definition to use for tasks in the service.
   * [disable-awslint:ref-via-interface]
   * @stability stable
   */
  readonly taskDefinition?: aws_ecs.TaskDefinition;
  /**
   * The name of the service.
   * @default - CloudFormation-generated name.
   * @stability stable
   */
  readonly serviceName?: string;
  /**
   * Configuration for Service Connect.
   * @default No ports are advertised via Service Connect on this service, and the service
cannot make requests to other services via Service Connect.
   * @stability stable
   */
  readonly serviceConnectConfiguration?: aws_ecs.ServiceConnectProps;
  /**
   * Specifies whether to propagate the tags from the task definition or the service to the tasks in the service.
   * Valid values are: PropagatedTagSource.SERVICE, PropagatedTagSource.TASK_DEFINITION or PropagatedTagSource.NONE
   * @default PropagatedTagSource.NONE
   * @stability stable
   */
  readonly propagateTags?: aws_ecs.PropagatedTagSource;
  /**
   * The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment.
   * @default - 0 if daemon, otherwise 50
   * @stability stable
   */
  readonly minHealthyPercent?: number;
  /**
   * The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment.
   * @default - 100 if daemon, otherwise 200
   * @stability stable
   */
  readonly maxHealthyPercent?: number;
  /**
   * The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started.
   * @default - defaults to 60 seconds if at least one load balancer is in-use and it is not already set
   * @stability stable
   */
  readonly healthCheckGracePeriod?: Duration;
  /**
   * Whether to enable the ability to execute into a container.
   * @default - undefined
   * @stability stable
   */
  readonly enableExecuteCommand?: boolean;
  /**
   * Specifies whether to enable Amazon ECS managed tags for the tasks within the service.
   * For more information, see
   * [Tagging Your Amazon ECS Resources](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html)
   * @default false
   * @stability stable
   */
  readonly enableECSManagedTags?: boolean;
  /**
   * The desired number of instantiations of the task definition to keep running on the service.
   * @default - When creating the service, default is 1; when updating the service, default uses
the current task number.
   * @stability stable
   */
  readonly desiredCount?: number;
  /**
   * Specifies which deployment controller to use for the service.
   * For more information, see
   * [Amazon ECS Deployment Types](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-types.html)
   * @default - Rolling update (ECS)
   * @stability stable
   */
  readonly deploymentController?: aws_ecs.DeploymentController;
  /**
   * The options for configuring an Amazon ECS service to use service discovery.
   * @default - AWS Cloud Map service discovery is not enabled.
   * @stability stable
   */
  readonly cloudMapOptions?: aws_ecs.CloudMapOptions;
  /**
   * Whether to enable the deployment circuit breaker.
   * If this property is defined, circuit breaker will be implicitly
   * enabled.
   * @default - disabled
   * @stability stable
   */
  readonly circuitBreaker?: aws_ecs.DeploymentCircuitBreaker;
  /**
   * A list of Capacity Provider strategies used to place a service.
   * @default - undefined
   * @stability stable
   */
  readonly capacityProviderStrategies?: Array<aws_ecs.CapacityProviderStrategy>;
  /**
   * The name of the cluster that hosts the service.
   * @stability stable
   */
  readonly cluster?: aws_ecs.ICluster;
}
