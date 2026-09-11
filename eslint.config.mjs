import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "build/**",
      "node_modules/**",
      "handoffs/**",
      "playwright-report/**",
      "test-results/**",
      "src/constants/optimizedImages.ts",
      "src/static/**",
    ],
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx}", "scripts/**/*.ts", "playwright.config.ts"],
  })),
  {
    files: ["src/**/*.{ts,tsx}", "scripts/**/*.ts", "playwright.config.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": "error",
    },
  },
);
