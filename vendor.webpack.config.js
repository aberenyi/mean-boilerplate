'use strict';

var webpack = require('webpack');

module.exports =
{
  context:  __dirname + '/public/app',
  entry: {
    vendor: './vendor.js'
  },
  output: {
    path:  __dirname + '/public/dist',
    filename: 'vendor.min.js'
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin() //-p
  ]
};
