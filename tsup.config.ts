import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  outDir: "dist",
  bundle: true,
  target: "es2020",
  platform: "neutral",
  treeshake: true,
});
