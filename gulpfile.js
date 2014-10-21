'use strict';

var gulp = require('gulp');
var bower = 'app/bower_components';
var rootFolder = 'dist';
var fs = require('fs');
var replace = require('gulp-replace');

// Load plugins
var $ = require('gulp-load-plugins')();

// Styles
gulp.task('styles', ['vendor-styles'], function () {
  return gulp.src('app/less/app.less')
    .pipe($.less({
      style: 'expanded',
      loadPath: ['app/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.csso())
    .pipe(gulp.dest(rootFolder + '/styles'))
    .pipe($.size())
    .pipe($.connect.reload());
});

// Styles
gulp.task('vendor-styles', function () {
  return gulp.src([
    'app/bower_components/foundation/css/foundation.css',
    'app/bower_components/foundation/css/normalize.css',
    ])
    .pipe($.concat('vendor.css'))
    .pipe($.autoprefixer('last 1 version'))
    .pipe($.csso())
    .pipe(gulp.dest(rootFolder + '/styles'))
    .pipe($.size())
    .pipe($.connect.reload());
});

// Vendor
gulp.task('vendor', function () {
  return gulp.src([
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/knockout/dist/knockout.js',
    'node_modules/parse/build/parse-latest.js',
    'app/bower_components/underscore/underscore-min.js',
    'app/bower_components/moment/min/moment.min.js',
    'app/bower_components/modernizr/modernizr.js',
    'app/bower_components/chrono/chrono.min.js'
    ])
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(rootFolder + '/scripts'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src('app/scripts/main.js')
    .pipe($.browserify({
      debug: true,
      transform: [
        'debowerify'
      ],
      // Note: At this time it seems that you will also have to
      // setup browserify-shims in package.json to correctly handle
      // the exclusion of vendor vendor libraries from your bundle
      external: ['lodash'],
      extensions: ['.js']
    }))
    // .pipe($.uglify())
    .pipe(gulp.dest(rootFolder + '/scripts'))
    .pipe($.size())
    .pipe($.connect.reload());
});

// HTML
gulp.task('html', ['templates'], function () {
  return gulp.src('app/index.html')
    .pipe($.copy(rootFolder, {
      prefix: 1
    }));
});

// HTML Templates
gulp.task('templates', function () {
  return gulp.src('app/templates/*.html')
    .pipe($.concat('templates.html'))
    .pipe(gulp.dest(rootFolder))
    .pipe($.connect.reload());
});

// Lint
gulp.task('lint', ['scripts'], function () {
  return gulp.src('app/scripts/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(require('jshint-stylish')))
});

// Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(rootFolder + '/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
    return gulp.src([
      rootFolder
    ], {read: false}).pipe($.clean());
});

// Build

gulp.task('build', ['styles', 'html', 'scripts', 'vendor', 'images']);

// Dev Server

gulp.task('dev', ['styles', 'html', 'scripts', 'vendor', 'images', 'connect', 'watch', 'lint']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('dev');
});

// Connect
gulp.task('connect', $.connect.server({
  root: __dirname + '/' + rootFolder,
  port: 9000,
  livereload:{
    port: 35729
  },
  open: {
    file: 'index.html',
    browser: 'Google Chrome'
  },
}));

// Watch
gulp.task('watch', ['connect'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        'app/less/**/*.less',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/templates/**/*.html'
    ], $.connect.reload);


    // Watch .less files
    gulp.watch('app/less/**/*.less', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Watch .html files
    gulp.watch('app/**/*.html', ['templates']);
});
