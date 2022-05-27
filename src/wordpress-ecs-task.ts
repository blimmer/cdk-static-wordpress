import { IVpc } from "aws-cdk-lib/aws-ec2";
import { FileSystem, FileSystemProps, LifecyclePolicy } from "aws-cdk-lib/aws-efs";
import { Construct } from "constructs";
import { WordpressContainer } from "./wordpress-container";

export interface IWordpressEcsTaskProps {
  vpc: IVpc;
  wordpressContainer: WordpressContainer;

  efsOverrides?: FileSystemProps;
}

export class WordpressEcsTask extends Construct {
  constructor(scope: Construct, id: string, props: IWordpressEcsTaskProps) {
    super(scope, id);

    const { vpc, wordpressContainer, efsOverrides } = props;

    const fileSystem = new FileSystem(this, "FileSystem", {
      vpc,
      encrypted: true,
      enableAutomaticBackups: true,
      lifecyclePolicy: LifecyclePolicy.AFTER_7_DAYS,
      ...efsOverrides,
    });
  }
}
