var gulp = require('gulp');
var props = require('./properties');

gulp.task('watchServer', function() {
  gulp.watch([props.serverAppDir + '**/*.js'], ['runServer']);
});