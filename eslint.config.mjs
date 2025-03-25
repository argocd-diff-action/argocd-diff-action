import stylistic from '@stylistic/eslint-plugin';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintImportPlugin from 'eslint-plugin-import';

export default tseslint.config(
    globalIgnores(['**/dist/', '**/lib/', '**/node_modules/']),
    eslint.configs.recommended,
    tseslint.configs.recommended,
    stylistic.configs.customize({
    // the following options are the default values
        indent: 4,
        quotes: 'single',
        semi: true,
        jsx: true,
    }),
    {
        plugins: {
            import: eslintImportPlugin,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2025,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        rules: {
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'no-public',
                },
            ],

            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/await-thenable': 'error',
            'camelcase': 'off',

            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                },
            ],

            '@stylistic/func-call-spacing': ['error', 'never'],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-extraneous-class': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unnecessary-qualifier': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/prefer-for-of': 'warn',
            '@typescript-eslint/prefer-function-type': 'warn',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            'github/array-foreach': 'off',
            '@stylistic/type-annotation-spacing': 'error',
            '@typescript-eslint/unbound-method': 'error',
        },
    });
