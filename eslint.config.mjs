import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off"
    }
  },
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "**/next-env.d.ts",
    "**/dist/**",
    "**/coverage/**",
    "supabase/**"
  ])
]);
