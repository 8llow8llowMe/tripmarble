import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['node_modules'],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    react,
    prettier,
  },
  rules: {
    // 코드 스타일
    'prettier/prettier': 'warn',

    // React
    'react/react-in-jsx-scope': 'off',

    // TypeScript 완화 규칙
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-require-imports': 'warn',
  },
  languageOptions: {
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },
});
