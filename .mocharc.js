module.exports = {
  diff: true,
  extension: ['js'],
  package: './package.json',
  spec: 'lib/**/test/**/*.test.js',
  timeout: 20000,
  'watch-files': ['lib/**/*.js'],
  'watch-ignore': ['lib/vendor', 'node_modules/']
};
