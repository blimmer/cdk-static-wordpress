const { awscdk } = require("projen");
const { ProseWrap, NpmAccess } = require("projen/lib/javascript");

const project = new awscdk.AwsCdkConstructLibrary({
  author: "Ben Limmer",
  authorAddress: "hello@benlimmer.com",
  cdkVersion: "2.59.0", // First release of 2023
  defaultReleaseBranch: "main",
  name: "@blimmer/cdk-static-wordpress",
  description: "Generate a static site from Wordpress (via WP2Static) using AWS CDK",
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: "https://github.com/blimmer/cdk-static-wordpress.git",
  keywords: ["cdk", "aws-cdk", "aws-cdk-construct", "projen", "wordpress", "static-site", "wp2static"],

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

  docgen: true,

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["blimmer-bot"] },

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      proseWrap: ProseWrap.ALWAYS,
    },
  },

  tsconfigDev: {
    compilerOptions: {
      noUnusedLocals: false, // This is annoying in dev
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  devDeps: ["prettier-plugin-organize-imports"],
});
project.synth();
