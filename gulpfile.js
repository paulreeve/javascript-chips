/* global require */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    clean = require('gulp-clean'),
    karma = require('gulp-karma'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    html2js = require('gulp-html2js'),
    uglify = require('gulp-uglify');

var paths = {
  allPkgJs: [
    'app/build/*.js'
  ],
  allJs: ['app/src/**/*.js'],
  allLintJs: [
    'app/src/**/*.js'
  ],
  allSrc: ['app/src/**'],
  buildDir: 'app/build',
  packageDir: 'app/package',
  srcDir: 'app/src',
  allTemplates: ['app/src/templates/**/*.html', 'app/src/templates/**/*.tpl'],
  buildFiles: ['app/src/**', '!app/src/templates', '!app/src/templates/**'],
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

gulp.task('clean:package', function () {
  return cleanDir(paths.packageDir);
});

// Will wait until the clean is done first.
gulp.task('copy:build', ['clean:build', 'html2js'], function () {
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

gulp.task('connect:package', function () {
  connect.server({
    port: '9001',
    root: './'
  });
});

gulp.task('html2js', function() {
  gulp.src(paths.allTemplates)
    .pipe(html2js({
      outputModuleName: 'javascript-chips-tpl',
      useStrict: true,
      base: 'app/src'
    }))
    .pipe(concat('template.js'))
    .pipe(gulp.dest(paths.buildDir))
});

gulp.task('min', function() {
  return gulp.src(paths.allPkgJs)
    .pipe(uglify({
      mangle: false
    }))
    .pipe(concat('javascript-chips.min.js'))
    .pipe(gulp.dest(paths.packageDir));
});

gulp.task('package', ['clean:package', 'min']);
gulp.task('default', ['build', 'watch', 'connect']);
gulp.task('package:view', ['package', 'connect:package']);
