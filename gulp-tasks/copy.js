var gulp = require('gulp');
var props = require('./properties');

gulp.task('copy', function () {
  return gulp.src([
      props.clientAppDir + '**/*.html',
      props.clientAppDir + '**/*.css',
      'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(gulp.dest(props.clientDistDir));
});