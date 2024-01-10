module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        cjs: 'never',
        vue: 'never'
      }
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        variables: false
      }
    ],
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
