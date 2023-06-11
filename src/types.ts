import { ContainerOverrides } from "aws-cdk-lib/aws-stepfunctions-tasks";
import { BehaviorOverrides } from "./generated/BehaviorOverrides";
import { DatabaseOverrides } from "./generated/DatabaseOverrides";
import { DistributionOverrides } from "./generated/DistributionOverrides";
import { ServiceOverrides } from "./generated/ServiceOverrides";
import { TaskDefinitionOverrides } from "./generated/TaskDefinitionOverrides";

export interface WordpressAdminProps {
  readonly email: string;
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret

  /**
   * The prefix to use for the non-static admin site. For example, if your static site is
   * foo.example.com and you pass `-admin` here, the admin site will be served at admin-foo.example.com.
   *
   * @default - "admin-"
   */
  readonly domainPrefix?: string;

  /**
   * Should we run the Wordpress admin console? Set this to `false` to save money when you're not actively editing
   * the site.
   *
   * @default true
   */
  readonly run?: boolean;

  /** [ADVANCED] Override various aspects of the ECS infrastructure */
  readonly ecsOverrides?: EcsOverrides;
}

export interface WordpressDatabaseProps {
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret

  /** [ADVANCED] Override properties on the Serverless Database Cluster */
  readonly databaseOverrides?: DatabaseOverrides;
}

export interface CloudFrontDistributionConfig {
  /** [ADVANCED] Override properties on the CloudFront distribution (e.g., add a WAF) */
  readonly distributionOverrides?: DistributionOverrides;
  /** [ADVANCED] Override the S3 origin behaviors */
  readonly behaviorOverrides?: BehaviorOverrides;
}

export interface EcsOverrides {
  /** [ADVANCED] Override properties on the Fargate Task Definition */
  readonly taskDefinitionOverrides?: TaskDefinitionOverrides;
  /** [ADVANCED] Override properties on the Fargate Container */
  readonly containerOverrides?: ContainerOverrides;
  /** [ADVANCED] Override properties on the Fargate Service */
  readonly serviceOverrides?: ServiceOverrides;
}
