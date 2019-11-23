module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
    'plugin:jsdoc/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    'jsdoc/check-types': 'off'
  },
  'plugins': [
    'jsdoc'
  ]
};
