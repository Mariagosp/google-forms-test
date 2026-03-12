import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../server/src/schema.gql",
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        enumsAsConst: true,
        apolloImportFrom: "@apollo/client/react",
        apolloReactCommonImportFrom: "@apollo/client/react",
        apolloReactHooksImportFrom: "@apollo/client/react",
      },
    },
  },
};

export default config;
