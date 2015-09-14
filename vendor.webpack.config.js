'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
{
  context:  __dirname + '/public/app',
  entry: {
    vendor: './vendor.js'
  },
  output: {
    path:  __dirname + '/public/dist',
    filename: 'vendor-[hash].min.js'
  },
  devtool: 'source-map', //-d
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader : 'file-loader?name=../assets/fonts/[name].[ext]?[hash]'
      }
    ]
  },
  plugins:
  [
    new HtmlWebpackPlugin({
      filename: '../../server/includes/scriptsVendor.jade',
      templateContent: function(templateParams)
      {
        return 'script(type="text/javascript", src="/dist/' +
          templateParams.webpackConfig.output.filename.replace('[hash]', templateParams.webpack.hash) + '")';
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin() //-p
  ]
};
