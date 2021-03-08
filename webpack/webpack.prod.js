/* eslint-disable import/no-extraneous-dependencies */
const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const PACKAGE_VERSION = require('../package.json').version;
const common = require('./webpack.common');

const config = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new EnvironmentPlugin({
      DEBUG: false,
      VERSION: PACKAGE_VERSION,
      NODE_ENV: 'production',
    }),
  ],
};

module.exports = merge(common, config);
