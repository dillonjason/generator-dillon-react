
var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackBase = require('./base');

var sassLoaders = [
  'css-loader',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?sourceMap&' +
  'includePaths[]=' + path.resolve(__dirname, './node_modules') +
  '&includePaths[]=' + path.resolve(__dirname, './src/client/sass')
];

var webpackProd = _.merge(webpackBase, {
  devtool: 'source-map',
  entry: {
    app: './src/client/js/app'
  }
});

webpackProd.module.rules = _.union(webpackBase.module.rules, [
  {
    test: /\.scss$|\.sass|\.css$/,
    loader: ExtractTextPlugin.extract({ fallbackLoader: "style-loader", loader: sassLoaders.join('!') })
  }
]);

webpackProd.plugins = _.union(webpackBase.plugins, [
  new ExtractTextPlugin({ filename: '[name].[hash].css', allChunks: false }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress:{
      warnings: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  })
]);

module.exports = webpackProd;
