const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(common.entry).forEach(function (name) {
    common.entry[name] = ['./config/dev-client'].concat(common.entry[name])
});

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        stats: {chunks: false},
        clientLogLevel: 'silent'
    },
    plugins: [
        new FriendlyErrorsPlugin()
    ],
});