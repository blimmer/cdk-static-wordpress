import { IVpc } from "aws-cdk-lib/aws-ec2";
import { ICluster } from "aws-cdk-lib/aws-ecs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { EcsTask } from "./EcsTask";
import { StaticHosting } from "./StaticHosting";
import { WordpressAdminProps } from "./types";
import { WordpressDockerImage, WordpressDockerImageProps } from "./WordpressDockerImage";

export interface WordpressServerlessProps {
  fullyQualifiedSiteName: string;
  hostedZone: IHostedZone;
  runWpAdmin?: boolean;

  vpc?: IVpc;
  ecsCluster?: ICluster;

  wordpressDockerImageProps?: WordpressDockerImageProps;

  wordpressAdminProps: WordpressAdminProps;
  // TODO: expose all override params from sub-constructs
}

export class WordpressServerless extends Construct {
  constructor(scope: Construct, id: string, props: WordpressServerlessProps) {
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
    new EcsTask(this, "EcsTask", {
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
  }
}

export * from "./types";
export { WordpressDockerImageProps } from "./WordpressDockerImage";
