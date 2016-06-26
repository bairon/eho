var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('buildClient', function(callback) {
  runSequence('clean',
              ['lint', 'bundle'],
              'copy',
              callback);
});
