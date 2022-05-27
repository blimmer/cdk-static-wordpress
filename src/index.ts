import { Construct } from "constructs";
import { IWordpressContainerProps, WordpressContainer } from "./wordpress-container";

export interface IWordpressServerlessProps {
  wordpressContainerProps?: IWordpressContainerProps;
}

export class WordpressServerless extends Construct {
  constructor(scope: Construct, id: string, props: IWordpressServerlessProps) {
    super(scope, id);
    const { wordpressContainerProps } = props;

    new WordpressContainer(this, "WordpressContainer", wordpressContainerProps);
  }
}
