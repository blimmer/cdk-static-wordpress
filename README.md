# CDK Static Wordpress

The goal of this project is to make it easy to deploy a static website, generated by [Wordpress](https://wordpress.org/)
as simple and cost-effective as possible.

It's largely inspired by
[TechToSpeech/terraform-aws-serverless-static-wordpress](https://github.com/TechToSpeech/terraform-aws-serverless-static-wordpress/),
but uses [AWS CDK](https://aws.amazon.com/cdk/) instead of Terraform.

It creates the infrastructure to launch a temporary, transient Wordpress container. You then log in and customize it
like any Wordpress site, and finally publish it as a static site fronted by a global CloudFront CDN and S3 Origin. When
you’re done you shut down the Wordpress container and it costs you almost nothing.

[WP2Static](https://wp2static.com/) is used to generate the static site from the Wordpress container.

## Quick Start

1. Install the construct:

   ```bash
   yarn add @blimmer/cdk-static-wordpress

   # or

   npm i --save @blimmer/cdk-static-wordpress
   ```

1. Instantiate a `StaticWordpress` instance a `Stack`:

   ```ts
   import { StaticWordpress } from "@blimmer/cdk-static-wordpress";
   import { Stack, StackProps } from "aws-cdk-lib";
   import { HostedZone } from "aws-cdk-lib/aws-route53";
   import { Construct } from "constructs";

   export class StaticWordpressStack extends Stack {
     constructor(scope: Construct, id: string, props?: StackProps) {
       super(scope, id, props);

       // You can create or import a hosted zone
       // See https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_route53.HostedZone.html
       const exampleHostedZone = new HostedZone(this, "ExampleHostedZone", {
         zoneName: "example.com",
       });
       new StaticWordpress(this, "StaticWordpress", {
         fullyQualifiedSiteName: "blog.example.com",
         hostedZone: exampleHostedZone,
         wordpressAdminProps: {
           email: "me@example.com",
         },
       });
     }
   }
   ```

1. Deploy with the [`cdk deploy` command](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-deploy)
1. Once the deployment completes, visit the Wordpress console at `admin-<fullyQualifiedSiteName>`. E.g., if your static
   site is `blog.example.com`, visit `admin-blog.example.com/wp-admin`. The default password for the wordpress user
   is `changeme` (please change it :smile:).
1. Customize Wordpress as you see fit, create posts, etc.
1. When you're ready to deploy your static site, trigger WP2Static.

   ![](https://github.com/blimmer/cdk-static-wordpress/assets/630449/598ecdd4-ffb6-4381-bd0e-50564622f3c3)

1. Visit your static site (e.g., `blog.example.com`) once WP2Static completes.
1. (optional) Shut down the Wordpress container to save money.

   ```ts
   new StaticWordpress(this, "StaticWordpress", {
     fullyQualifiedSiteName: "blog.example.com",
     hostedZone: exampleHostedZone,
     wordpressAdminProps: {
       email: "me@example.com",
       run: false, // <-- Shut down the container after deployment
     },
   });
   ```

## Architecture

TODO

## Escape Hatches

This construct provides escape hatches, to allow you to customize the underlying infrastructure if you need to. This is
a big benefit of using CDK over Terraform (where every customizable property must be manually exposed as a variable).

Look for `*Overrides` in [the API docs](/API.md) for customization options. But, be warned, we allow overriding almost
everything, so you can easily produce invalid infrastructure if you don't know what you're doing.
