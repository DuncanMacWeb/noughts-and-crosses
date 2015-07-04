var gulp = require('gulp')
var jade = require('jade');
var jadeBabel = require('jade-babel');
var gulpJade = require('gulp-jade');
var babel = require('gulp-babel');
 
jade.filters.babel = jadeBabel({ stage: 0 });

gulp.task('html', function () {
  return gulp.src('src/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['html', 'js']);
