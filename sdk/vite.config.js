//vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/lib",
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      name: "Web3 OAuth",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "ws"],
    },
  },
});
