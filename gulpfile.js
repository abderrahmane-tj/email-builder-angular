var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var styles = [
    "bower_components/tooltipster/css/tooltipster.css",
    "bower_components/tooltipster/css/themes/tooltipster-light.css",
    "bower_components/angular-dragula/dist/dragula.min.css",
    "bower_components/spectrum/spectrum.css",
    "bower_components/font-awesome/css/font-awesome.min.css",
    "bower_components/remodal/dist/remodal.css",
    "bower_components/remodal/dist/remodal-default-theme.css",
    "app/css/app.css"
]

gulp.task('sass', function() {
    return gulp.src('app/sass/app.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass()) // sass em up
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('fonts', function() {
    return gulp.src('bower_components/font-awesome/fonts/**')
    .pipe(gulp.dest('app/fonts'));
});


gulp.task('styles',['sass','fonts'],function(){
    return gulp.src(styles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('all.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('default', ['styles'], function() {
    gulp.watch('app/sass/**/*.scss', ['styles']);
});