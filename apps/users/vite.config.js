import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/auth": process.env.HOST,
      "/comments": process.env.HOST,
      "/posts": process.env.HOST,
    },
  },

  resolve: {
    alias: {
      "@shared": "/apps/shared",
    },
  },
});
