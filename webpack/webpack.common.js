/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

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
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'media',
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
