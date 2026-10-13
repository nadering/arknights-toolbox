import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = fileURLToPath(new URL("./src/", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": src,
      "@data": `${src}data`,
      "@depot": `${src}app/depot`,
      "@common": `${src}app/_common`,
    },
  },
  oxc: { jsx: { runtime: "automatic" } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["scripts/operator-generator/{builders,converters,parsers}/**/*.ts", "src/tool/{set-depot,persisted-depot,calculate-user-need}.ts", "src/app/depot/**/*.tsx"],
      reporter: ["text", "html", "lcov"],
    },
  },
});
