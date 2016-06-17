require('dotenv').load();

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpacker = require('webpack-stream'),
    webpack = require('webpack'),
    sourcemaps = require('gulp-sourcemaps'),
    runSeq = require('run-sequence'),
    wait = require('gulp-wait'),
    replace = require('gulp-replace'),
    flatten = require('gulp-flatten');

gulp.task('sass', function () {
    gulp.src('./src/scss/**/*.scss', { base: './' })
        .pipe(flatten())
        /*.pipe(replace('<%--assetUrl--%>', process.env.ASSET_DOMAIN))*/
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('sass-webpack', function (callback) {
    runSeq('sass', 'webpack', callback);
});

gulp.task('webpack', function () {
    return gulp.src([])
        .pipe(webpacker({
            entry: {
                galleria: './src/js/galleria.js'
            },
            output: {
                filename: (process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js')
            },
            module: {
                loaders: [{
                    exclude: /(node_modules|vendor)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'stage-1', 'stage-2', 'stage-3']
                    }
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }]
            },
            plugins: process.env.NODE_ENV === 'production' ? [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
                }),
                new webpack.optimize.UglifyJsPlugin()
            ] : [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
                })
            ],
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.scss'], ['sass-webpack']);
    gulp.watch(['./src/**/*.js'], ['webpack']);
});

gulp.task('default', function (callback) {
    runSeq('sass-webpack', 'watch', callback);
});
