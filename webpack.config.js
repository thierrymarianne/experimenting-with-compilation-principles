var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { modules: false }
              ],
              [
                '@babel/preset-stage-2', 
                { decoratorsLegacy: true }
              ]
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }, {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: path.join(__dirname, '.eslintrc.json'),
        }
      }      
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  }
};