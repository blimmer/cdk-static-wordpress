import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { WordpressServerless } from "../src";

describe("WordpressServerless", () => {
  function createStack() {
    const app = new App();
    const stack = new Stack(app, "Stack");
    new WordpressServerless(stack, "WordpressServerless", {});

    return stack;
  }

  it("renders", () => {
    const stack = createStack();
    Template.fromStack(stack);
  });
});
