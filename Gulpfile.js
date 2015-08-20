var gulp = require('gulp')
var jade = require('jade');
var jadeBabel = require('jade-babel');
var gulpJade = require('gulp-jade');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

jade.filters.babel = jadeBabel({ stage: 0 });

gulp.task('html', function () {
  return gulp.src('src/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

var browserifyOpts = {
  debug: true
};
var babelOpts = {
  stage: 0
};

gulp.task('modules', function() {
  var b = browserify(browserifyOpts);
  b.add(require.resolve('babel/polyfill'));
  b.add('./src/index.js');

  b.transform(babelify.configure(babelOpts))
  .bundle()
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('tests', function (cb) {
  glob('./src/test/**/*.js', {}, function (err, files) {
    var b = browserify(browserifyOpts);
    b.add(require.resolve('babel/polyfill'));
    files.forEach(function (file) {
      b.add(file);
    });
    b.transform(babelify.configure(babelOpts));
    b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./test'));
    cb();
  });
});

gulp.task('default', ['html', 'modules', 'tests']);
