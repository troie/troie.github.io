var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    uncss = require('gulp-uncss'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    htmlmin = require('gulp-html-minifier'),
    livereload = require('gulp-livereload');

//gulp.task('sass', function() {
//  return gulp.src('src/styles/main.scss')
//    .pipe(sass({ style: 'compressed' }))
//    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//    .pipe(gulp.dest('dist/assets/css'))
//});

gulp.task('copyHtml', function() {
    gulp.src('*.html').pipe(gulp.dest('dist'));
});

gulp.task('minify', function() {
  gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/minHtml'))
});

//gulp.task('un-css', function() {
//    return gulp.src('./css/site.css')
//        .pipe(uncss({
//            html: ['index.html', 'posts/**/*.html', 'http://example.com']
//        }))
//        .pipe(gulp.dest('./out'));
//});

gulp.task('minify-css', function() {
    return gulp.src('./css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    //    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src('img/*')
    //  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({
        message: 'Images task complete'
    }));
});

// clean
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js', 'dist/img'], {
        read: false
    })
    .pipe(clean());
});

// default
gulp.task('default', ['clean'], function() {
    gulp.start('copyHtml','minify-html', 'minify-css', 'scripts', 'images');
});

gulp.task('watch', function() {
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('img/*', ['images']);

    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);
});
