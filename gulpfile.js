var gulp = require('gulp');
var webpack = require('webpack');
var appWebpackConfig = require('./app.webpack.config');
var vendorWebpackConfig = require('./vendor.webpack.config');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var webpackStream = require('webpack-stream');
var config = require('./_core/config')[process.env.ENV || 'dev'];

gulp.task('ngdocs', [], function () {
  console.log();
  return gulp.src('./public/app/_core/Auth.js')
    .pipe(plugins.ngdocs.process())
    .pipe(gulp.dest('./docs'));
});

gulp.task('clean:app', function()
{
  return del(['public/dist/*app-*', 'public/dist/common*']);
});

gulp.task('clean:vendor', function()
{
  return del(['public/dist/vendor-*']);
});

gulp.task('watch:jade', function()
{
  gulp.src('public/**/*.jade')
    .pipe(plugins.livereload());
});

gulp.task('webpack:app', ['clean:app'], function()
{
  return gulp.src('/public/app/app.js')
    .pipe(webpackStream(appWebpackConfig, webpack))
    .pipe(gulp.dest('public/dist'))
    .pipe(plugins.livereload());
});

gulp.task('webpack:vendor', ['clean:vendor'], function()
{
  return gulp.src('/public/app/app.js')
    .pipe(webpackStream(vendorWebpackConfig, webpack))
    .pipe(gulp.dest('public/dist'))
    .pipe(plugins.livereload());
});

gulp.task('nodemon', function()
{
  plugins
    .nodemon
    ({
      script: 'server.js',
      watch: ['server/**/*.js', 'server/**/*.jade', 'server.js', 'gulpfile.js']
    })
    .on('start', function()
    {
      setTimeout(function(){plugins.livereload.changed(__dirname);}, 1000);
    });
});

//open browser
gulp.task('open', ['nodemon'], function()
{
  var options = {uri: 'http://localhost:3002'};
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

  gulp.watch('public/app/**/*.jade', ['watch:jade'])
  gulp.watch(['public/app/**/*.js', '!public/app/vendor.js', 'public/styles/*.css'], ['webpack:app']);
  gulp.watch('public/app/vendor.js', ['webpack:vendor']);
});
