var ExtractTextPlugin = require('extract-text-webpack-plugin')

var loaders = require('./loaders')
var resolve = require('./resolve')

module.exports = {
  bail: true,
  entry: {
    index: './src/index.css'
  },
  output: {
    filename: 'index.css',
    path: '.'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer')
      }
    ]
  },
  resolve: resolve,
  plugins: [
    new ExtractTextPlugin('index.css')
  ]
}