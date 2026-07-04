import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setupTests.ts"],
    globals: true,
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
