const webpackConfig = require('../webpack.config.js');

const coverageReporter = {
  dir: './coverage',
  reporters: [
    { type: 'lcov', subdir: '.' },
    { type: 'text-summary' }
  ]
};

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      '**/*.spec.js',
    ],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    reporters: ['spec', 'coverage'],
    coverageReporter: coverageReporter,
    browsers: ['PhantomJS']
  })
};
