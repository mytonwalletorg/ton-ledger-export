const path = require('path');
const { ProvidePlugin } = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js',
    library: 'myLibrary',
    libraryTarget: 'window',
    clean: true,
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlPlugin({
      template: 'src/index.html',
    }),
  ],
};

