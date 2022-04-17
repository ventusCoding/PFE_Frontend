import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as proxyPlugin from "vite-plugin-proxy";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "./src/assets",

  server: {
    proxy: {
      "/backend": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ""),
      },
    },
  },

  plugins: [react()],
});
