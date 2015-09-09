'use strict';

var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports =
{
  context:  __dirname + '/public/app',
  entry: {
    app: './app.js'
  },
  output: {
    path:  __dirname + '/public/dist',
    filename: 'app.min.js'
  },
  devtool: 'source-map', //-d
  module: {
    preLoaders: [
      {
        test: /\.min.js$/,
        loader: "source-map-loader"
      }
    ],
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
    new ngAnnotatePlugin(),
    new webpack.optimize.UglifyJsPlugin() //-p
  ]
};
