import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/{rollup, vite, vitest}.config.*",
    ],
  },
});
