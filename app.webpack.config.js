'use strict';

var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
{
  context:  __dirname + '/public/app',
  entry: {
    app: './app.js'
  },
  output: {
    path:  __dirname + '/public',
    publicPath: '/dist/',
    filename: 'app-[hash].min.js'
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
    new HtmlWebpackPlugin
    ({
      filename: '../../server/includes/scriptsApp.jade',
      inject: true,
      templateContent: function(templateParams)
      {
        var hash = templateParams.webpackConfig.output.filename.replace('app-[hash]', templateParams.webpack.hash);
        return '' +
          'script(type="text/javascript", src="/dist/common-' + hash + '")\n' +
          'script(type="text/javascript", src="/dist/app-' + hash + '")';
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('common-[hash].min.js'),
    new webpack.optimize.DedupePlugin(),
    new ngAnnotatePlugin()//,
    //new webpack.optimize.UglifyJsPlugin() //-p
  ]
};
