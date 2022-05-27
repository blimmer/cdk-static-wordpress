import { IVpc } from "aws-cdk-lib/aws-ec2";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { StaticWordpressHosting } from "./static-wordpress-hosting";
import { IWordpressContainerProps, WordpressContainer } from "./wordpress-container";
import { WordpressEcsTask } from "./wordpress-ecs-task";

export interface IWordpressServerlessProps {
  fullyQualifiedSiteName: string;
  vpc: IVpc;
  hostedZone: IHostedZone;

  wordpressContainerProps?: IWordpressContainerProps;
  // TODO: expose all override params from sub-constructs
}

export class WordpressServerless extends Construct {
  constructor(scope: Construct, id: string, props: IWordpressServerlessProps) {
    super(scope, id);
    const { fullyQualifiedSiteName, hostedZone, vpc, wordpressContainerProps } = props;

    const staticWordpressHosting = new StaticWordpressHosting(this, "StaticWordpressHosting", {
      fullyQualifiedSiteName,
      hostedZone,
    });
    const wordpressContainer = new WordpressContainer(this, "WordpressContainer", wordpressContainerProps);
    new WordpressEcsTask(this, "WordpressEcsTask", { vpc, wordpressContainer });
  }
}
