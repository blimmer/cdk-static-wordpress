const { awscdk } = require("projen");
const { ProseWrap } = require("projen/lib/javascript");
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Ben Limmer",
  authorAddress: "hello@benlimmer.com",
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "cdk-wordpress-serverless",
  repositoryUrl: "https://github.com/blimmer/cdk-wordpress-serverless.git",

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
      proseWrap: ProseWrap.ALWAYS,
    },
  },

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
