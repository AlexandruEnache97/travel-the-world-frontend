const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const config = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new EnvironmentPlugin({
            DEBUG: false,
            VERSION: require('../package.json').version,
            NODE_ENV: 'production',
        }),
    ]
}