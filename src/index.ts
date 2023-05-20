import { IVpc } from "aws-cdk-lib/aws-ec2";
import { ICluster } from "aws-cdk-lib/aws-ecs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { StaticWordpressHosting } from "./static-wordpress-hosting";
import { WordpressAdminProps } from "./types";
import { IWordpressContainerProps, WordpressContainer } from "./wordpress-container";
import { WordpressEcsTask } from "./wordpress-ecs-task";

export interface IWordpressServerlessProps {
  fullyQualifiedSiteName: string;
  hostedZone: IHostedZone;
  runWpAdmin?: boolean;

  vpc?: IVpc;
  ecsCluster?: ICluster;

  wordpressContainerProps?: IWordpressContainerProps;

  wordpressAdminProps: WordpressAdminProps;
  // TODO: expose all override params from sub-constructs
}

export class WordpressServerless extends Construct {
  constructor(scope: Construct, id: string, props: IWordpressServerlessProps) {
    super(scope, id);
    const {
      fullyQualifiedSiteName,
      hostedZone,
      vpc,
      ecsCluster,
      wordpressAdminProps,
      wordpressContainerProps,
      runWpAdmin = true,
    } = props;
    const siteId = fullyQualifiedSiteName.replace(/[\W_]+/g, "-");

    const staticWordpressHosting = new StaticWordpressHosting(this, "StaticWordpressHosting", {
      fullyQualifiedSiteName,
      hostedZone,
    });
    const wordpressContainer = new WordpressContainer(this, "WordpressContainer", wordpressContainerProps);
    new WordpressEcsTask(this, "WordpressEcsTask", {
      siteId,
      hostedZone,
      fullyQualifiedSiteName,
      ecsCluster,
      vpc,
      staticWordpressHosting,
      wordpressContainer,
      wordpressAdminProps,
      runWpAdmin,
    });
  }
}
