/* global require */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    clean = require('gulp-clean'),
    karma = require('gulp-karma'),
    connect = require('gulp-connect');

var paths = {
  allJs: ['app/src/**/*.js', '!app/src/bower_components/**/*.js'],
  allLintJs: [
    'app/src/**/*.js',
    '!app/src/bower_components/**/*.js',
    '!app/src/vendor/**/*.js'
  ],
  allSrc: ['app/src/**', '!app/src/vendor/**'],
  buildDir: 'app/build',
  srcDir: 'app/src',
  buildFiles: ['app/src/**'],
  testFiles: ['app/src/**/*.js', '!app/src/**/*.spec.js']
};

gulp.task('lint', function () {
  gulp.src(paths.allLintJs)
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
  gulp.src(paths.buildFiles, { base: paths.srcDir })
  .pipe(gulp.dest(paths.buildDir));
});

gulp.task('build', ['lint', 'copy:build']);

gulp.task('watch', function () {
  gulp.watch(paths.allSrc, ['build']);
});

gulp.task('test', function () {
  // Be sure to return the stream
  return gulp.src(paths.testFiles)
    .pipe(karma({
      action: 'run',
      configFile: 'karma-unit.conf.js',
      browsers: ['PhantomJS']
    }));
});

gulp.task('connect', function () {
  connect.server({
    port: '9000',
    root: paths.buildDir
  });
});

gulp.task('default', ['build', 'watch', 'connect']);
