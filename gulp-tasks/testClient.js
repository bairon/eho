require("babel-register");

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var props = require('./properties');

gulp.task('testClient', function () {
  return gulp.src(props.clientTestDir + '**/*.js', {read: false})
    .pipe(mocha());
});
