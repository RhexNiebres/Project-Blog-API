import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"), // ✅ Use @shared to import files from shared/
    },
  },
  optimizeDeps: {
    include: ["react-router-dom"], // ✅ Make sure Vite processes react-router-dom
  },
  server: {
    watch: {
      ignored: ["!../shared/**"], // ✅ Ensure Vite watches shared/ for changes
    },
  },
});
