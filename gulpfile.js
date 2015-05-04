var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var assign = require('object-assign');
var karma = require('karma').server;

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

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('test-watch', function() {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    });
});

gulp.task('serve', function() {
    require('./serve');
});

gulp.task('tdd', ['webpack-watch', 'test-watch', 'serve']);

gulp.task('default', ['webpack-watch']);

