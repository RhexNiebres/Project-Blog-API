import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"), // ✅ Alias for shared folder
    },
  },
  optimizeDeps: {
    include: ["react-router-dom"], // ✅ Ensure it's bundled properly
  },
});
