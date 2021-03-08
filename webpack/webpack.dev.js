/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const { EnvironmentPlugin } = require('webpack');
const common = require('./webpack.common');

const PACKAGE_VERSION = require('../package.json').version;
const { OUTPUT_PATH, DEFAULT_PORT } = require('./constants.js');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HotModuleReplacementPlugin(),
    new EnvironmentPlugin({
      DEBUG: true,
      VERSION: PACKAGE_VERSION,
      NODE_ENV: 'development',
    }),
  ],
  devServer: {
    hot: true,
    port: DEFAULT_PORT,
    open: 'chrome',
    compress: true,
    liveReload: true,
    contentBase: OUTPUT_PATH,
    historyApiFallback: {
      disableDotRule: true,
    },
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};

module.exports = merge(common, config);
