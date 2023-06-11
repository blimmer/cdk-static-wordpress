import { BehaviorOverrides } from "./generated/BehaviorOverrides";
import { DistributionOverrides } from "./generated/DistributionOverrides";

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

  /**
   * Enables ECS Exec (https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html). You can use
   * this to access the container running the Wordpress admin console.
   *
   * NOTE: If you enable toggle this flag for an already-running WP Admin site, you'll need to manually stop the
   * existing task. The ECS service will replace the task with a new one that has ECS Exec enabled. This is a
   * CloudFormation limitation.
   *
   * @default false
   */
  readonly enableEcsExec?: boolean;
}

export interface WordpressDatabaseProps {
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret
}

export interface CloudFrontDistributionConfig {
  readonly distributionOverrides?: DistributionOverrides;
  readonly behaviorOverrides?: BehaviorOverrides;
}
