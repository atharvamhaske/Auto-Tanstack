import { defineConfig } from "orval";

export default defineConfig({
  todoApi: {
    input: "./openapi.yaml",
    output: {
      mode: "split",
      target: "./src/api/todoApi.ts",
      client: "react-query",
      schemas: "./src/apitodoApiSchema.ts"
    },
  },
});
