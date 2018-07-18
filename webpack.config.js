const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },  
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.(sc|c)ss$/,
        oneOf: [
          {
            resourceQuery: /-module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          }, {
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  data: '@import "variables.scss";',
                  sourceMap: true,
                  includePaths: [
                    path.join(__dirname, 'src/styles'), 
                    path.join(__dirname, 'src/styles/content'),
                    path.join(__dirname, 'src/styles/structure-of-a-compiler'),
                  ]
                }
              },
            ]
          }
        ]
      }, {
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
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devtool: '#eval-source-map' 
};