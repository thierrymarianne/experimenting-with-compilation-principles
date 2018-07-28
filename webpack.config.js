const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const developmentMode = environment !== 'production';
const productionMode = environment === 'production';
const testMode = environment === 'test';

let mode = environment;
if (testMode) {
  mode = 'development';
}

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({includeManifest: 'manifest'});
const HtmlWebpackPlugin = require('html-webpack-plugin');

let styleLoader = MiniCssExtractPlugin.loader;
if (developmentMode) {
  styleLoader = 'vue-style-loader';
}

let sourceMap = 'source-map';
if (developmentMode) {
  sourceMap = 'eval-source-map';
}

if (testMode) {
  sourceMap = 'inline-cheap-module-source-map';
}

let eslintConfig = '.eslintrc-production.json';
if (developmentMode) {
  eslintConfig = '.eslintrc.json';
}
if (testMode) {
  eslintConfig = '.eslintrc-test.json';
}

let outputDirectory = 'docs'
if (developmentMode) {
  outputDirectory = 'dist';
}

const sassLoaderOptions = {
  data: '@import "variables.scss";',
  sourceMap: true,
  includePaths: [
    path.join(__dirname, 'src/styles'),
    path.join(__dirname, 'src/styles/content'),
    path.join(__dirname, '/src/styles/structure-of-a-compiler'),
  ]
};

let plugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    title: 'Compilers: Principles, Techniques, and Tools',
    template: 'index.html.ejs',
    inject: 'body',
  }),
];

if (productionMode) {
  plugins.concat([
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    assetsPluginInstance,
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    })
  ]);
}

let optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          ascii_only: true
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      },
    },
  },
  runtimeChunk: {
    name: "manifest",
  }
};
if (testMode) {
  optimization = {
    splitChunks: {
      chunks: "async"
    }
  };
}

let webpackConfig = {
  node: {
    module: 'empty',
    net: 'empty', 
    fs: 'empty',
  },
  mode: mode,
  entry: './src/index.js',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.vue', '.js', '.css', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  optimization: optimization,
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
              styleLoader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[path]_[local]_[hash:base64:5]'
                },              
              },
            ]
          }, {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                }
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: sassLoaderOptions,
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
          configFile: path.join(__dirname, eslintConfig),
        }
      }      
    ],
  },
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkHash].bundle.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  plugins: plugins,
  devtool: sourceMap
};

module.exports = webpackConfig;
