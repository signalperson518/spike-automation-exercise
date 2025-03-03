import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["tests/**/*.ts"], // Apply to all TypeScript files in tests/
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      //"no-console": "warn",
    },
  },
  eslint.configs.recommended, // Equivalent to "eslint:recommended"
  ...tseslint.configs.recommended, // Equivalent to "plugin:@typescript-eslint/recommended"
  {
    languageOptions: {
      globals: {
        node: true, // Equivalent to "env": { "node": true }
      },
    },
  },
];