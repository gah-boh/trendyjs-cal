var WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
    entry: './app/app.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: [
        new WebpackNotifierPlugin()
    ]
};
