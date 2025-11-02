// vite.config.ts

import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
  },
} as UserConfig);
