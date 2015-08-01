var gulp = require('gulp')
var jade = require('jade');
var jadeBabel = require('jade-babel');
var gulpJade = require('gulp-jade');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

jade.filters.babel = jadeBabel({ stage: 0 });

gulp.task('html', function () {
  return gulp.src('src/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

// from http://advantcomp.com/blog/ES6Modules/
gulp.task('modules', function() {
    browserify({
      entries: './src/index.js',
      debug: true
    })
    .transform(babelify.configure({
      stage: 0
    }))
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['html', 'modules']);
