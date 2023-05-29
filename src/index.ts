import { IVpc } from "aws-cdk-lib/aws-ec2";
import { ICluster } from "aws-cdk-lib/aws-ecs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { EcsTask } from "./EcsTask";
import { StaticHosting } from "./StaticHosting";
import { WordpressAdminProps } from "./types";
import { WordpressDockerImage, WordpressDockerImageProps } from "./WordpressDockerImage";

export interface StaticWordpressProps {
  /** The fully qualified site name (e.g., myblog.com or subdomain.myblog.com) */
  readonly fullyQualifiedSiteName: string;

  /** The HostedZone to use to create DNS entries for the site */
  readonly hostedZone: IHostedZone;

  /**
   * Should we run the Wordpress admin console? Set this to `false` to save money when you're not actively editing
   * the site.
   *
   * @default true
   */
  readonly runWpAdmin?: boolean;

  /**
   * The VPC assigned to the `ecsCluster`.
   *
   * @default - a new VPC will be created
   */
  readonly vpc?: IVpc;

  /**
   * The ECS cluster for the Wordpress admin site.
   *
   * @default - a new ECS cluster will be created
   */
  readonly ecsCluster?: ICluster;

  readonly wordpressDockerImageProps?: WordpressDockerImageProps;
  readonly wordpressAdminProps: WordpressAdminProps;
  // TODO: expose all override params from sub-constructs
}

export class StaticWordpress extends Construct {
  public readonly staticHosting: StaticHosting;
  public readonly wordpressDockerImage: WordpressDockerImage;
  public readonly ecsTask: EcsTask;

  constructor(scope: Construct, id: string, props: StaticWordpressProps) {
    super(scope, id);
    const {
      fullyQualifiedSiteName,
      hostedZone,
      vpc,
      ecsCluster,
      wordpressAdminProps,
      wordpressDockerImageProps,
      runWpAdmin = true,
    } = props;
    const siteId = fullyQualifiedSiteName.replace(/[\W_]+/g, "-");

    const staticHosting = new StaticHosting(this, "StaticHosting", {
      siteId,
      fullyQualifiedSiteName,
      hostedZone,
    });
    const wordpressDockerImage = new WordpressDockerImage(this, "WordpressDockerImage", wordpressDockerImageProps);
    const ecsTask = new EcsTask(this, "EcsTask", {
      siteId,
      hostedZone,
      fullyQualifiedSiteName,
      ecsCluster,
      vpc,
      staticHosting,
      wordpressDockerImage: wordpressDockerImage,
      wordpressAdminProps,
      runWpAdmin,
    });

    this.staticHosting = staticHosting;
    this.wordpressDockerImage = wordpressDockerImage;
    this.ecsTask = ecsTask;
  }
}

export { EcsTask, EcsTaskProps } from "./EcsTask";
export { StaticHosting, StaticHostingProps } from "./StaticHosting";
export * from "./types";
export { WordpressDockerImage, WordpressDockerImageProps } from "./WordpressDockerImage";
