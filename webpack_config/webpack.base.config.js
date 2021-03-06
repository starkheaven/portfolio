const path                 = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../build'),
  assets: 'static/'
}

module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src
  },

  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      }
    }, {
      test: /\.(svg|woff|woff2|eot|ttf)$/,
      loader: 'file-loader',
      options: {
        name: `${PATHS.assets}fonts/[name].[ext]`,
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
         loader: 'css-loader',
         options: { sourceMap: true }
        }, {
         loader: 'postcss-loader',
         options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
        },
      ]
    }, {
      test: /\.sass$/,
      use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
           loader: 'css-loader',
           options: { sourceMap: true }
          }, {
           loader: 'postcss-loader',
           options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
          }, {
           loader: 'sass-loader',
           options: { sourceMap: true }
          }
      ]
    }]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/favicon`, to: `${PATHS.assets}/img/icons` },
      { from: `${PATHS.src}/static`, to: '' },
    ])
  ],
}
