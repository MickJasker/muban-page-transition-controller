// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['@mediamonks'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': 'warn',
  },
  settings: {
    // webpack integration
    'import/resolver': {
      webpack: {
        config: 'build-tools/config/webpack/webpack.conf.base.js',
      },
    },
  },
};
