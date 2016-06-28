var gulp = require('gulp');
var eslint = require('gulp-eslint');
var props = require('./properties');

gulp.task('lint', function () {
  return gulp.src([props.clientAppDir + '**/*.jsx',
                   props.clientAppDir + '**/*.js',
                   props.clientTestDir + '**/*.js',
                   '!node_modules/**'])
    .pipe(eslint({
        'extends': ['eslint:recommended', 'plugin:react/recommended', 'google'],
        'plugins': ['react'],
        'parser': 'babel-eslint',
        'rules': {
          'react/prop-types': 1,
          'no-console': 1,
          'linebreak-style': 0
        },
        'globals': {
          'io': true,
          'PIXI': true
        },
        'env': {
          'browser': true,
          'node': true,
          'commonjs': true,
          'es6': true,
          'mocha': true
        }
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});
