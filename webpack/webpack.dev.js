const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const { OUTPUT_PATH, DEFAULT_PORT } = require('./constants.js');
const { HotModuleReplacementPlugin } = require('webpack');
const { EnvironmentPlugin } = require('webpack');

const config = {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new EnvironmentPlugin({
            DEBUG: true,
            VERSION: require('../package.json').version,
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

console.log(OUTPUT_PATH)

module.exports = merge(common, config);