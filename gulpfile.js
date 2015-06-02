/* jshint unused: false */

'use strict';

var gulp = require('gulp');
var gutil = require('gutil');
var paths = require('./gulp_tasks/_paths.js');
var concat = require('gulp-concat');
var del = require('del');
var sass = require('gulp-sass');
var importCss = require('gulp-import-css');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require("vinyl-source-stream");
var babelify = require('babelify');


var cleanTask = function (options) {
  // Ensure the files are deleted before calling next task
  del(paths.dest.dist);
};


// scripts
var scriptsTask = function (options) {
  var watch = (options || {}).watch || true;

  var appBundler = browserify({
        entries: [paths.main_jsx], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: true, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

  // appBundler.external(options.development ? ['react'] : []);

  var rebundle = function () {
    var start = Date.now();
    console.log('Building app.js');
    appBundler
      .transform(babelify)
      .bundle()
      .on('error', gutil.log)
      .pipe(source(paths.dest.app))
      // .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(paths.dest.dist));
      // .pipe(notify(function () {
      //   console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      // }));
  };

  appBundler = watchify(appBundler);
  appBundler.on('update', rebundle);
  rebundle();
}


// css
var cssTask = function (options) {
  var run = function() {
    console.log('Building app.css');
    gulp
      .src(paths.styles)
      .pipe(sass({
        lineNumbers: true,
        style: 'compact'
      }))
      .on('error', gutil.log)
      .pipe(importCss())
      .pipe(gulp.dest(paths.dest.dist));
  }
  run();
  gulp.watch(paths.styles, run);
}


// html
var htmlTask = function (options) {
  console.log('Building html');
  var run = function() {
    gulp
      .src(paths.html)
      .pipe(gulp.dest(paths.dest.dist));
  }
  run();
  gulp.watch(paths.html, run);
}


// images
var imagesTask = function (options) {
  console.log('Building images');
  var run = function() {
    gulp
      .src(paths.images)
      .pipe(gulp.dest(paths.dest.images));
  }
  run();
  gulp.watch(paths.images, run);
}


gulp.task('build', function() {
  cleanTask();
  scriptsTask();
  cssTask();
  htmlTask();
  imagesTask();
});

gulp.task('default', ['build']);