import { defineConfig } from "vite";
export default defineConfig({
  build: {
    lib: { entry: "src/vinylmatrix-card.ts", formats: ["es"], fileName: () => "vinylmatrix-card.js" },
    outDir: "dist", emptyOutDir: true, sourcemap: false, minify: "esbuild",
  },
});
