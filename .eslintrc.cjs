const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'vue',
  ],
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`,
    }),
  },
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
  },
};
