import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Astro files
  {
    files: ['**/*.astro'],
    plugins: { astro: astroPlugin },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
    },
  },
  // TypeScript / JavaScript files
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
];
