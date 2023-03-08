/* eslint-env node */
module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2022': true,
    'node': true,
  },
  'parserOptions': {
    'ecmaVersion': 2022,
    'sourceType': 'module',
  },
  'globals': {},
  'plugins': [ 'promise' ],
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  'overrides': [
    {
      'files': [ '**/*.ts', '**/*.tsx' ],
      'env': { 'browser': true, 'es6': true, 'node': true },
      'parser': '@typescript-eslint/parser',
      'plugins': [
        '@typescript-eslint',
      ],
      'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      'rules': {
        'indent': 'off',
        '@typescript-eslint/indent': [ 'error', 2 ],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
  ],
  'rules': {
    'no-case-declarations': 'off',
    'no-async-promise-executor': 'off',
    'block-spacing': 'error',
    'import/named': 'off',
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'never' ],
    'curly': 2,
    'indent': [ 'error', 2 ],
    'no-throw-literal': 'off',
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'singleValue': true,
        'objectsInArrays': true,
        'arraysInArrays': true,
      },
    ],
    'camelcase': [
      'error',
      {
        'properties': 'always',
      },
    ],
    'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', { 'after': true } ],
    'space-in-parens': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'key-spacing': [ 'error', { afterColon: true, mode: 'strict' } ],
    'template-curly-spacing': [ 'error', 'always' ],
    'keyword-spacing': [ 'error', { before: true, after: true } ],
    'operator-assignment': [ 'error', 'always' ],
    'no-var': 'error',
    'func-style': 'error',
    'no-console': [
      'error',
    ],
    'eol-last': [ 'error', 'always' ],
    'vue/html-indent': [
      'error',
      2,
      {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true,
      },
    ],
    'vue/html-self-closing': 0,
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        'ignoreWhenNoAttributes': true,
        'ignoreWhenEmpty': true,
        'ignores': [
          'b-col',
        ],
      },
    ],
    'vue/no-multiple-template-root': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        'singleline': 'never',
        'multiline': 'never',
      },
    ],
    'vue/no-v-for-template-key': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 1,
        'multiline': {
          'max': 1,
        },
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        'registeredComponentsOnly': false,  
      },
    ],
    'vue/attribute-hyphenation': [
      'error',
      'always',
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        'startTag': 'always',
        'selfClosingTag': 'always',
      },
    ],
    'vue/mustache-interpolation-spacing': [
      'error',
      'always',
    ],
    'vue/no-v-model-argument': 0,
    'vue/v-on-event-hyphenation': [
      'error',
      'never',
    ],
  },
}
  
