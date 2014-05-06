/* global require */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    clean = require('gulp-clean'),
    karma = require('gulp-karma');

var paths = {
  allJs: ['app/src/**/*.js'],
  buildDir: 'app/build',
  buildFiles: ['app/src/**'],
  testFiles: ['app/src/**/*.js', '!app/src/**/*.spec.js']
};

gulp.task('lint', function () {
  gulp.src(paths.allJs)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

var cleanDir = function (dir) {
  return gulp.src(dir, {read: false})
    .pipe(clean({force: true}));
};

gulp.task('clean:build', function () {
  return cleanDir(paths.buildDir);
});

// Will wait until the clean is done first.
gulp.task('copy:build', ['clean:build'], function () {
  gulp.src(paths.buildFiles, { base: 'app/src' })
  .pipe(gulp.dest(paths.buildDir));
});

gulp.task('build', ['lint', 'copy:build']);

gulp.task('test', function () {
  // Be sure to return the stream
  return gulp.src(paths.testFiles)
    .pipe(karma({
      action: 'run',
      configFile: 'karma-unit.conf.js',
      browsers: ['PhantomJS']
    }));
});
