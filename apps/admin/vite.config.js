import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true, // shared dependencies
    alias: {
      "@shared": path.resolve(__dirname, "../shared"), // name for shared folder
    },
  },
  server: {
    proxy: {
      "/auth": "http://localhost:8080",
      "/comments": "http://localhost:8080",
      "/posts": "http://localhost:8080",
    },
  },
});
