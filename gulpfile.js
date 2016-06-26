var gulp = require('gulp');
var runSequence = require('run-sequence');
require('require-dir')('./gulp-tasks');

gulp.task('default', function(callback) {
  runSequence(['buildClient', 'runServer'],
              ['watchClient', 'watchServer'],
              callback);
});
