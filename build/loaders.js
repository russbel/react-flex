module.exports = [
  {
    test: /\.jsx$/,
    exclude: /node_modules/,
    loader: 'babel'
  },,
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.css$/,
    loader: 'style!css!autoprefixer'
  }
]