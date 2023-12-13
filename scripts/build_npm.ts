// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    // package.json properties
    name: "maybeasy",
    version: Deno.args[0],
    description: "Maybe implemented in TypeScript",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/kofno/maybeasy.git",
    },
    bugs: {
      url: "https://github.com/kofno/maybeasy/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("readme.md", "npm/readme.md");
  },
});
