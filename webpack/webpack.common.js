/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { INPUT_PATH, OUTPUT_PATH } = require('./constants.js');

const config = {
  entry: {
    app: `${INPUT_PATH}/index.jsx`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Travel The World',
      template: `${INPUT_PATH}/index.ejs`,
      filename: `${OUTPUT_PATH}/index.html`,
      favicon: `${OUTPUT_PATH}/media/favicon.png`,
    }),
    new ESLintPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
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
  devtool: 'source-map',
};

module.exports = config;
