var gulp = require('gulp');
var webpack = require('webpack');
var appWebpackConfig = require('./app.webpack.config');
var vendorWebpackConfig = require('./vendor.webpack.config');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var gulpWebpack = require('gulp-webpack');

gulp.task('clean:app', function()
{
  return del(['public/dist/app-*']);
});

gulp.task('clean:vendor', function()
{
  return del(['public/dist/vendor-*']);
});

gulp.task('webpack:app', ['clean:app'], function()
{
  return gulp.src('/public/app/app.js')
    .pipe(gulpWebpack(appWebpackConfig, webpack))
    .pipe(gulp.dest('public/dist'))
    .pipe(plugins.livereload());
});

gulp.task('webpack:vendor', ['clean:vendor'], function()
{
  return gulp.src('/public/app/app.js')
    .pipe(gulpWebpack(vendorWebpackConfig, webpack))
    .pipe(gulp.dest('public/dist'))
    .pipe(plugins.livereload());
});

gulp.task('nodemon', function()
{
  plugins
    .nodemon
    ({
      script: 'server.js',
      watch: ['server/**/*.js', 'server.js', 'gulpfile.js']
    })
    .on('start', function()
    {
      setTimeout(function(){plugins.livereload.changed(__dirname);}, 1000);
    });
});

//open browser
gulp.task('open', ['nodemon'], function()
{
  var options = {uri: 'http://localhost:3030'};
  setTimeout
  (
    function()
    {
      gulp
        .src(__filename)
        .pipe(plugins.open(options));
    },
    1000
  );
});

//serve/build in one config - thanks to webpack
gulp.task('serve', ['open'], function ()
{
  //start livereload server
  plugins.livereload.listen();

  gulp.watch(['public/app/**/*.js', '!public/app/vendor.js', 'public/styles/*.css'], ['webpack:app']);
  gulp.watch('public/app/vendor.js', ['webpack:vendor']);
});
