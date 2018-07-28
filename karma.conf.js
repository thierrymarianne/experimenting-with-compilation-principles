var webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.spec.js'
    ],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './test/coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    browsers: ['Chrome']
  })
}
