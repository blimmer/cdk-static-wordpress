const { awscdk } = require("projen");
const { ProseWrap, NpmAccess } = require("projen/lib/javascript");
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Ben Limmer",
  authorAddress: "hello@benlimmer.com",
  cdkVersion: "2.59.0", // First release of 2023
  defaultReleaseBranch: "main",
  name: "@blimmer/cdk-static-wordpress",
  npmAccess: NpmAccess.PUBLIC,
  repositoryUrl: "https://github.com/blimmer/cdk-static-wordpress.git",

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
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ["prettier-plugin-organize-imports"],
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
