import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "http://localhost:8080",
      "/comments": "http://localhost:8080",
      "/posts": "http://localhost:8080",
    },
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "react-router-dom"], // Externalize all shared dependencies
    },
  },
  resolve: {
    alias: {
      "@shared": "/apps/shared", // Adjust if needed
    },
  },
});
