import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import tstlParser from '@typescript-eslint/parser';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

// Base config — JS recommended + TS recommended (tanpa type-checked rules)
const baseConfig = [
  {
    ignores: ['node_modules/**', 'dist/**', 'dev-dist/**', '*.js'],
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
  },
];

// Type-checked rules — hanya untuk .ts/.tsx
const tsFilesConfig = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tstlParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
  },
  rules: {
    ...tseslint.configs['flat/recommended-type-checked'].rules,
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};

// Vue files — pakai vue-eslint-parser, tidak ada type-checked rules
const vueFilesConfig = {
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tstlParser,
    },
  },
  plugins: {
    vue,
  },
  rules: {
    ...vue.configs['flat/recommended'].rules,
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};

export default [
  ...baseConfig,
  tsFilesConfig,
  vueFilesConfig,
  prettier,
];
