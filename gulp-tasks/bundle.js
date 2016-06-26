var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var props = require('./properties');

gulp.task('bundle', function () {
  return browserify({
    entries: props.clientAppDir + props.clientMainFile,
    debug: true
  }).transform(babelify)
    .transform(reactify)
    .bundle()
    .pipe(source(props.clientMainFile))
    .pipe(gulp.dest(props.clientDistDir))
});