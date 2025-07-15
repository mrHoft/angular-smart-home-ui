import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  globalIgnores([".angular/**/*"]),
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      'unicorn/better-regex': 'warn',
    },
  },
]);
