var gulp = require('gulp')
var jade = require('jade');
var jadeBabel = require('jade-babel');
var gulpJade = require('gulp-jade');
 
jade.filters.babel = jadeBabel({ stage: 0 });
 
gulp.task('default', function () {
  return gulp.src('src/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
})
