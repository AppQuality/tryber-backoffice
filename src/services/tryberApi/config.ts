import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: process.env.API_URL || "",
  apiFile: "./api.ts",
  apiImport: "api",
  outputFile: "index.ts",
  exportName: "tryberApi",
  hooks: true,
};

export default config;
