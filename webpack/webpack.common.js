/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { INPUT_PATH, OUTPUT_PATH } = require('./constants.js');

const config = {
  entry: {
    app: `${INPUT_PATH}/index.jsx`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ConfigureIT',
      template: `${INPUT_PATH}/index.ejs`,
      filename: `${OUTPUT_PATH}/index.html`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};

module.exports = config;
