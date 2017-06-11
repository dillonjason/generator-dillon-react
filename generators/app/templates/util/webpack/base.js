var config = require('config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

var fileName = config.get('shouldHotReload') ? '[name].js' : '[name].[hash].js';

var webpackBase = {
  entry: {
    vendors: [
      'lodash',
      'react',
      'react-addons-test-utils',
      'react-dom'
    ]
  },
  output: {
    path: process.cwd() + '/dist/assets/public/',
    publicPath: '<%= baseRoute %>/assets/public/',
    filename: fileName
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: fileName }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: 'src/server/html/index._TEMPLATE_.html',
      inject: 'body'
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: ['src/client/js', 'node_modules', 'src/client/sass']
  },
  module: {
    rules: [
      {
        test: /\.woff([\?]?.*)$/,
        loader: 'file-loader'
      }, {
        test: /\.woff2([\?]?.*)$/,
        loader: 'file-loader'
      }, {
        test: /\.ttf([\?]?.*)$/,
        loader: 'file-loader'
      }, {
        test: /\.eot([\?]?.*)$/,
        loader: 'file-loader'
      }, {
        test: /\.json([\?]?.*)$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.svg([\?]?.*)$/,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [ 'es2015', { modules: false } ],
            'react'
          ],
          env: {
            dev: {
              plugins: [['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }]
              }]]
            }
          }
        }
      }

    ]
  }
};

module.exports = webpackBase;
