'use strict';

// Main dependencies and plugins
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require("vinyl-source-stream");

var appDir = './client/app/';
var jsxAssets = appDir + '**/*.jsx';
var htmlAssets = appDir + '**/*.html';
var cssAssets = appDir + '**/*.css';
var publicDir = './client/dist';

// Lint Task
gulp.task('lint', function () {
  // ESLint ignores files with 'node_modules' paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src([jsxAssets, '!node_modules/**'])
    // eslint() attaches the lint output to the 'eslint' property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('bundle', function () {
  return browserify({
    entries: './client/app/main.jsx',
    debug: true
  }).transform(reactify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(publicDir))
});

gulp.task('copy', function () {
  return gulp.src([
      htmlAssets,
      cssAssets,
      'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(gulp.dest(publicDir));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch([jsxAssets, htmlAssets, cssAssets], ['lint', 'bundle', 'copy']);
});

gulp.task('demon', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
  .on('start', ['build', 'watch'])
  .on('change', ['watch'])
  .on('restart', function () {
    console.log('restarted!');
  });
});

// Default Task
gulp.task('default', ['demon']);
gulp.task('build', ['bundle', 'copy']);
