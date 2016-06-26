var gulp = require('gulp');
var props = require('./properties');

gulp.task('watchClient', function () {
  gulp.watch([props.clientAppDir + '**/*'], ['lint', 'bundle', 'copy']);
});
