module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
	plugins: ['prettier'],
  globals: {
    context: 'readonly',
    given: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/no-v-html': 'off',
    'import/no-unresolved': 'off',
    "import/prefer-default-export": "off",
    "no-alert": "off",
    'vue/attribute-hyphenation': 'off',
    'vue/require-name-property': 'off',
    'no-shadow': 'off',
    'import/no-cycle': 'off',
    'no-use-before-define': 'off',
    'camelcase': 'off',
    'no-unused-expressions': 'off',
    'import/no-self-import': 'off',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': true,
        'useTabs': false,
        'tabWidth': 2,
        'trailingComma': 'all',
        'bracketSpacing': true,
        'printWidth': 120,
        'arrowParens': 'always'
      }
    ],
  },
};
