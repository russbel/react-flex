module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'style!css!autoprefixer'
  }
]