import { ProjenStruct, Struct } from "@mrgrain/jsii-struct-builder";
import { awscdk } from "projen";
import { Stability } from "projen/lib/cdk";
import { NpmAccess, ProseWrap } from "projen/lib/javascript";

const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,

  author: "Ben Limmer",
  authorAddress: "hello@benlimmer.com",
  cdkVersion: "2.59.0", // First release of 2023
  jsiiVersion: "~5.0.0",
  defaultReleaseBranch: "main",
  name: "@blimmer/cdk-static-wordpress",
  description: "Generate a static site from Wordpress (via WP2Static) using AWS CDK",
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: "https://github.com/blimmer/cdk-static-wordpress.git",
  keywords: ["cdk", "aws-cdk", "aws-cdk-construct", "projen", "wordpress", "static-site", "wp2static"],
  stability: Stability.DEPRECATED,

  publishToNuget: {
    nugetApiKeySecret: "NUGET_TOKEN",
    dotNetNamespace: "BenLimmer.CdkStaticWordpress",
    packageId: "BenLimmer.CdkStaticWordpress",
  },

  publishToPypi: {
    twineUsernameSecret: "TWINE_USERNAME", // this resolves to __token__ to use token auth
    twinePasswordSecret: "PYPI_TOKEN",
    distName: "cdk-static-wordpress",
    module: "cdk_static_wordpress",
  },

  publishToMaven: {
    mavenRepositoryUrl: "https://maven.pkg.github.com/${{ github.repository }}",
    javaPackage: "com.benlimmer.cdkstaticwordpress",
    mavenGroupId: "com.benlimmer",
    mavenArtifactId: "cdk-static-wordpress",
  },

  docgen: false,

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["blimmer-bot"] },

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      proseWrap: ProseWrap.ALWAYS,
    },
  },

  eslintOptions: {
    dirs: ["src", "test"],
    ignorePatterns: ["src/generated/*.ts"],
  },

  tsconfigDev: {
    compilerOptions: {
      noUnusedLocals: false, // This is annoying in dev
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: ["prettier-plugin-organize-imports", "@mrgrain/jsii-struct-builder"],
});

// CloudFront/Static Hosting Overrides
new ProjenStruct(project, { name: "DistributionOverrides", filePath: "src/generated/DistributionOverrides.ts" }).mixin(
  Struct.fromFqn("aws-cdk-lib.aws_cloudfront.DistributionProps")
    .allOptional()
    .omit("defaultBehavior")
    .withoutDeprecated()
);
new ProjenStruct(project, { name: "BehaviorOverrides", filePath: "src/generated/BehaviorOverrides.ts" }).mixin(
  Struct.fromFqn("aws-cdk-lib.aws_cloudfront.BehaviorOptions").allOptional().omit("origin").withoutDeprecated()
);

// Database Overrides
new ProjenStruct(project, { name: "DatabaseOverrides", filePath: "src/generated/DatabaseOverrides.ts" }).mixin(
  Struct.fromFqn("aws-cdk-lib.aws_rds.ServerlessClusterProps").allOptional().withoutDeprecated()
);

// ECS-related Overrides
new ProjenStruct(project, {
  name: "TaskDefinitionOverrides",
  filePath: "src/generated/TaskDefinitionOverrides.ts",
}).mixin(Struct.fromFqn("aws-cdk-lib.aws_ecs.FargateTaskDefinitionProps").allOptional().withoutDeprecated());
new ProjenStruct(project, { name: "ContainerOverrides", filePath: "src/generated/ContainerOverrides.ts" }).mixin(
  Struct.fromFqn("aws-cdk-lib.aws_ecs.ContainerDefinitionOptions").allOptional().withoutDeprecated()
);
new ProjenStruct(project, { name: "ServiceOverrides", filePath: "src/generated/ServiceOverrides.ts" }).mixin(
  Struct.fromFqn("aws-cdk-lib.aws_ecs.FargateServiceProps").allOptional().withoutDeprecated()
);

project.synth();
