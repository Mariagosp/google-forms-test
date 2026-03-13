import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../server/src/schema.gql",
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "./src/services/generatedApi.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-rtk-query"],
      config: {
        importBaseApiFrom: "./api",
        exportHooks: true,

        documentMode: "string",
        graphqlRequestBaseQuery: true,
      },
    },
  },
};

export default config;
