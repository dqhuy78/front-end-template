var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

gulp.task('build-sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build-image', function() {
    return gulp.src('src/images/**/*.+(png|jpg|svg)')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({
                optimizationLevel: 2,
                bitDepthReduction: false,
                colorTypeReduction: false,
            }),
        ]))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('build-font', function() {
    return gulp.src('src/fonts/*.+(otf|ttf|fnt)')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('default', ['build-sass', 'build-image', 'build-font']);
