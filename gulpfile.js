var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('sass', function() {
    return gulp.src('app/css/app.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass()) // sass em up
    .pipe(sourcemaps.write('.')) // write sourcemaps
    .pipe(gulp.dest('app/css')); // output results
});

gulp.task('default', ['sass'], function() {
    gulp.watch('app/css/**/*.scss', ['sass']);
});