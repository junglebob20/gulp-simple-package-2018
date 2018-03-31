var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var validator = require('gulp-html');
var uglify = require('gulp-uglify')
var bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./dist"
        }
    });
});

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
                .pipe(sourcemaps.init())
                .pipe(sass(sassOptions).on('error', sass.logError))
                .pipe(autoprefixer(autoprefixerOptions))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('./dist/css'))
                .pipe(bs.reload({stream: true}));
});

gulp.task('js', function(){
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
gulp.task('html', function() {
    return gulp.src('src/index.html')
    .pipe(validator())
    .pipe(gulp.dest('dist/'));
  });
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./src/*.html",['html']).on('change', bs.reload);
    gulp.watch("./src/js/*.js").on('change', bs.reload);
});