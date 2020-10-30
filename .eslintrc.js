module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-extend-native': ['off'],
    'no-underscore-dangle': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'comma-dangle': ['off'],
    'global-require': ['off'],
    'no-restricted-syntax': ['off'],
    'no-useless-escape': ['off'],
    radix: ['off'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-param-reassign': ['off'],
    'no-restricted-globals': ['off'],
    'no-continue': ['off']
  }
};
