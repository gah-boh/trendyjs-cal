/* eslint-env node */

var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, '/app'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            react$: 'react/addons',
            di$: 'aurelia-dependency-injection'
        }
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [
        new WebpackNotifierPlugin()
    ]
};
