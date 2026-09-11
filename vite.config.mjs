import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { basename, extname } from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

const src = fileURLToPath(new URL("./src/", import.meta.url));

export default defineConfig({
  plugins: [react({ jsxRuntime: "classic" })],
  server: { strictPort: true },
  resolve: {
    alias: [
      {
        find: /^(components|constants|static|util)\//,
        replacement: `${src}$1/`,
      },
    ],
  },
  css: {
    postcss: { plugins: [autoprefixer()] },
    preprocessorOptions: {
      scss: { loadPaths: [src] },
    },
  },
  build: {
    outDir: "build",
    assetsInlineLimit: 0,
    target: "es2017",
    rolldownOptions: {
      output: {
        assetFileNames(asset) {
          const name = asset.names[0];
          const extension = extname(name);
          if (extension === ".css") return "assets/[name]-[hash][extname]";
          // Preserve CRA's public media URLs, including shared PDF/map links.
          const hash = createHash("md5")
            .update(asset.source)
            .digest("hex")
            .slice(0, 8);
          return `static/media/${basename(name, extension)}.${hash}${extension}`;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
