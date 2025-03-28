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
      external: [], // ✅ Ensure nothing critical is excluded
    },
  },
});
