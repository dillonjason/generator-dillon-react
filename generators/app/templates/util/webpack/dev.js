
var _ = require('lodash');
var webpackBase = require('./base');

var webpackDev = _.merge(webpackBase, {
  devtool: 'eval-source-map',
  entry: {
    app:[
      'webpack-hot-middleware/client',
      './src/client/js/app'
    ]
  },
  cache: true
});

webpackDev.module.rules = _.union(webpackBase.module.rules, [
  {
    test: /\.scss$|\.sass|\.css$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  }
]);

module.exports = webpackDev;
