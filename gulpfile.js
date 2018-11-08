var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');

var jsSource = [
    'node_modules/jquery/dist/jquery.min.js',
    'src/js/**/*.js'
];

var sassSource = [
    'src/scss/app.scss'
]

/**
 * PRODUCTION BUILD
 */

gulp.task('build-html', function () {
    return gulp.src('src/pages/**/*.html')
        .pipe(htmlreplace({
            'css': '../css/app.min.css',
            'js': '../js/app.min.js'
        }))
        .pipe(gulp.dest('dist/pages'))
});

gulp.task('build-js', function () {
    return gulp.src(jsSource)
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('build-sass', function () {
    return gulp.src(sassSource)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build-image', function () {
    return gulp.src('src/images/**/*.+(png|jpg|svg)')
        .pipe(imagemin([
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({
                optimizationLevel: 2,
                bitDepthReduction: false,
                colorTypeReduction: false,
            }),
        ]))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('build-font', function () {
    return gulp.src('src/fonts/*.+(otf|ttf|fnt)')
        .pipe(gulp.dest('dist/fonts'))
});

/**
 * DEVELOPMENT BUILD
 */

gulp.task('watch-js', function () {
    return gulp.src(jsSource)
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dev/js'))
})

gulp.task('watch-sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dev/css'))
});

gulp.task('watch-font', function () {
    return gulp.src('src/fonts/*.+(otf|ttf|fnt)')
        .pipe(gulp.dest('dev/fonts'))
});

gulp.task('default', ['build-html', 'build-js', 'build-sass', 'build-image', 'build-font']);
gulp.task('dev', ['watch-js', 'watch-sass', 'watch-font']);
gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['watch-js']);
    gulp.watch('src/scss/**/*.scss', ['watch-sass']);
    gulp.watch('src/fonts/*.+(otf|ttf|fnt)', ['watch-font']);
})
