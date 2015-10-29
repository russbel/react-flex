var loaders = require('./loaders')

module.exports = {
  entry: './test.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: loaders,
  },
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    publicPath: '/assets',
    port: 8181,
    // host: '0.0.0.0',
    // hot: true,
    historyApiFallback: true
  }
}