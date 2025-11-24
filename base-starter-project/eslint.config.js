const expo = require('eslint-config-expo');
const prettier = require('eslint-config-prettier');

module.exports = [
  ...expo,
  prettier,
  {
    ignores: ['node_modules/', 'dist/', '.expo/', 'web-build/'],
  },
];

