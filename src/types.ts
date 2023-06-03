import { FunctionAssociation, PriceClass } from "aws-cdk-lib/aws-cloudfront";

export interface WordpressAdminProps {
  readonly email: string;
  readonly username?: string;
  readonly password?: string; // TODO: or secretsmanager secret

  /**
   * The suffix to use for the non-static admin site. For example, if your static site is
   * foo.example.com and you pass `-admin` here, the admin site will be served at foo-admin.example.com.
   *
   * @default - "-admin"
   */
  readonly domainSuffix?: string;

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

// TODO: use https://github.com/mrgrain/jsii-struct-builder to allow overriding arbitrary properties
export interface CloudFrontDistributionConfig {
  /**
   * The PriceClass to use for the CloudFront distribution. See
   * https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html
   *
   * @default - PriceClass.PRICE_CLASS_ALL
   */
  readonly priceClass?: PriceClass;

  /**
   * WARNING: you should not probably not use this property. The author is using this for an advanced workaround
   * on one of his sites.
   */
  readonly functionAssociations?: FunctionAssociation[];
}
