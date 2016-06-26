var gulp = require('gulp');
var spawn = require('child_process').spawn;
var props = require('./properties');
var node;

gulp.task('runServer', function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', [props.serverAppFile], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});