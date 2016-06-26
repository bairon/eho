var gulp = require('gulp');
var clean = require('gulp-clean');
var props = require('./properties');

gulp.task('clean', function () {
  return gulp.src(props.clientDistDir, {read: false})
             .pipe(clean());
});
