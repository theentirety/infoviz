'use strict';

var gulp = require('gulp');
var bower = 'app/bower_components';
var rootFolder = 'dist';
var deployFolder = 'parse/public';
var deployMode = false;
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
    .pipe($.if(deployMode, gulp.dest(deployFolder + '/styles')))
    .pipe($.if(!deployMode, gulp.dest(rootFolder + '/styles')))
    .pipe($.size())
    .pipe($.if(!deployMode, $.connect.reload()));
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
    .pipe($.if(deployMode, gulp.dest(deployFolder + '/styles')))
    .pipe($.if(!deployMode, gulp.dest(rootFolder + '/styles')))
    .pipe($.size())
    .pipe($.if(!deployMode, $.connect.reload()));
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
    'app/bower_components/chrono/chrono.min.js',
    'app/bower_components/pagerjs/dist/pager.min.js'
    ])
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe($.if(deployMode, gulp.dest(deployFolder + '/scripts')))
    .pipe($.if(!deployMode, gulp.dest(rootFolder + '/scripts')))
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
    .pipe($.if(deployMode, $.uglify()))
    .pipe($.if(deployMode, gulp.dest(deployFolder + '/scripts')))
    .pipe($.if(!deployMode, gulp.dest(rootFolder + '/scripts')))
    .pipe($.size())
    .pipe($.if(!deployMode, $.connect.reload()));
});

// HTML
gulp.task('html', ['templates'], function () {
  return gulp.src('app/index.html')
    .pipe($.if(deployMode, $.copy(deployFolder, {
      prefix: 1
    })))
    .pipe($.if(!deployMode, $.copy(rootFolder, {
      prefix: 1
    })));
});

// HTML Templates
gulp.task('templates', function () {
  return gulp.src('app/templates/*.html')
    .pipe($.concat('templates.html'))
    .pipe($.if(deployMode, gulp.dest(deployFolder)))
    .pipe($.if(!deployMode, gulp.dest(rootFolder)))
    .pipe($.if(!deployMode, $.connect.reload()));
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
    .pipe($.if(deployMode, gulp.dest(deployFolder + '/images')))
    .pipe($.if(!deployMode, gulp.dest(rootFolder + '/images')))
    .pipe($.size());
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src([
  	'app/fonts/fonts/**/*',
  	'!app/fonts/icons',
  	'!app/fonts/demos'
  	])
    .pipe($.if(deployMode, gulp.dest(deployFolder + '/fonts')))
    .pipe($.if(!deployMode, gulp.dest(rootFolder + '/fonts')))
    .pipe($.size())
    .pipe($.if(!deployMode, $.connect.reload()));
});

// Clean
gulp.task('clean', function () {
    return gulp.src([
      rootFolder
    ], {read: false}).pipe($.clean());
});

// Clean Deploy
gulp.task('clean-deploy', function () {
    return gulp.src([
      deployFolder + '/'
    ], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['styles', 'html', 'scripts', 'vendor', 'images', 'fonts']);

// Dev Server

gulp.task('dev', ['styles', 'html', 'scripts', 'vendor', 'images', 'fonts', 'connect', 'watch', 'lint']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('dev');
});

// Deploy task
gulp.task('deploy', ['clean-deploy'], function () {
	deployMode = true;
    gulp.start('build');
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
        'app/templates/**/*.html',
        'app/fonts/fonts/**/*'
    ], $.connect.reload);


    // Watch .less files
    gulp.watch('app/less/**/*.less', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

    // Watch .html files
    gulp.watch('app/**/*.html', ['templates']);

    // Watch .font files
    gulp.watch('app/fonts/fonts/**/*', ['fonts']);
});
