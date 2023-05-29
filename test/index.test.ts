import { App, Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { StaticWordpress } from "../src";

describe("StaticWordpress", () => {
  function createStack() {
    const app = new App();
    const stack = new Stack(app, "Stack");
    const hostedZone = new HostedZone(stack, "HostedZone", {
      zoneName: "example.com",
    });
    new StaticWordpress(stack, "StaticWordpress", {
      fullyQualifiedSiteName: "myblog.example.com",
      hostedZone,
      wordpressAdminProps: {
        email: "admin@example.com",
      },
    });

    return stack;
  }

  it("renders", () => {
    const stack = createStack();
    Template.fromStack(stack);
  });
});
