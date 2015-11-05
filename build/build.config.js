var loaders = require('./loaders')
var plugins = require('./plugins')
var resolve = require('./resolve')

module.exports = {
  bail: true,
  entry: './index.jsx',
  output: {
    filename: 'index.js'
  },
  plugins: plugins,
  module: {
    loaders: loaders,
  },
  resolve: resolve
}