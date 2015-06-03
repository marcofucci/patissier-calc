/* jshint unused: false */

'use strict';

var gulp = require('gulp');
var gutil = require('gutil');
var paths = require('./gulp_paths.js');
var concat = require('gulp-concat');
var del = require('del');
var sass = require('gulp-sass');
var importCss = require('gulp-import-css');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require("vinyl-source-stream");
var babelify = require('babelify');
var atom = require( 'gulp-atom' );
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');


// clean
gulp.task('clean', function(cb) {
  del(paths.dest.dist, cb);
})


// scripts
gulp.task('scripts', function() {
  var watch = true;

  var appBundler = browserify({
        entries: [paths.main_jsx], // The entry file, normally "main.js"
        transform: [reactify], // Convert JSX style
        debug: true, // Sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

  var rebundle = function () {
    var start = Date.now();
    console.log('Building app.js');
    return appBundler
      .transform(babelify)
      .bundle()
      .on('error', gutil.log)
      .pipe(source(paths.dest.app))
      .pipe(gulp.dest(paths.dest.dist));
  };

  appBundler = watchify(appBundler);
  appBundler.on('update', rebundle);
  return rebundle();
});

// gulp.task('lib-scripts', function() {
//   var run = function() {
//     console.log('Building lib.js');
//     gulp.src(paths.vendor_scripts)
//       .pipe(gulpFilter(['**/jquery.js', '**/foundation.js']))
//       // .pipe(uglify())
//       .pipe(concat(paths.dest.lib))
//       .pipe(gulp.dest(paths.dest.dist));
//   }
//   gulp.watch(paths.vendor_scripts, run);
//   return run();
// });


// css
gulp.task('css', function() {
  var run = function() {
    console.log('Building app.css');
    return gulp
      .src(paths.styles)
      .pipe(sass({
        lineNumbers: true,
        style: 'compact'
      }))
      .on('error', gutil.log)
      .pipe(importCss())
      .pipe(gulp.dest(paths.dest.dist));
  }
  gulp.watch(paths.styles, run);
  return run();
});


// html
gulp.task('html', function() {
  var run = function() {
    console.log('Building html');
    return gulp
      .src(paths.html)
      .pipe(gulp.dest(paths.dest.dist));
  }
  gulp.watch(paths.html, run);
  return run();
});


// images
gulp.task('images', function() {
  var run = function() {
    console.log('Building images');
    return gulp
      .src(paths.images)
      .pipe(gulp.dest(paths.dest.images));
  }
  gulp.watch(paths.images, run);
  return run();
});


// electron
gulp.task('electron', function() {
  var run = function() {
    return gulp
      .src(paths.electron)
      .pipe(gulp.dest(paths.dest.dist));
  }
  gulp.watch(paths.electron, run);
  return run();
});


// exec
gulp.task('build-exec', function() {
  livereload.listen();

  var run = function() {
    console.log('exec');
    atom({
      srcPath: paths.dest.dist,
      releasePath: './build',
      cachePath: './cache',
      version: 'v0.27.2',
      rebuild: false,
      platforms: ['darwin-x64']
    });

  };
  // gulp.watch(paths.dest.dist_files, run);
  gulp.watch(paths.dest.dist_files, function(vinyl) {
    run();
    gulp.src(vinyl.path).pipe(livereload());
  });
  return run();
});


gulp.task('build', function() {
  runSequence(
    'clean', ['scripts', 'electron', 'css', 'html', 'images'], 'build-exec'
  );
});

gulp.task('default', ['build']);
