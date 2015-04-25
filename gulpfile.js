var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var assign = require('object-assign');

var webpackConfig = require('./webpack.config');

function buildWebpack(config) {
    webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack bundle', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false
        }));
    });
}

gulp.task('webpack', function() {
    buildWebpack(webpackConfig);
});

gulp.task('webpack-watch', function() {
    var customConfig = assign({}, webpackConfig);
    customConfig.watch = true;
    customConfig.devtool = 'source-map';
    buildWebpack(customConfig);
});

gulp.task('default', ['webpack-watch']);

