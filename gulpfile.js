const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const wrap = require("gulp-wrap");
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('app/sass/app.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function() {
    return gulp.src('bower_components/font-awesome/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});


const vendorStyles = [
    "bower_components/angular-dragula/dist/dragula.min.css",
    "bower_components/spectrum/spectrum.css",
    "bower_components/font-awesome/css/font-awesome.min.css",
    "bower_components/remodal/dist/remodal.css",
    "bower_components/remodal/dist/remodal-default-theme.css"
];
gulp.task('styles',['sass','fonts'],function(){
    return gulp.src(vendorStyles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('vendor.css'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js',function () {
    return gulp.src('app/js/app/**/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(concat('app.js'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/js"));
});

const vendorScripts = [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/tinymce/tinymce.min.js",
    "bower_components/angular/angular.min.js",
    "bower_components/angular-sanitize/angular-sanitize.min.js",
    "bower_components/angular-dragula/dist/angular-dragula.min.js",
    "bower_components/store-js/store.min.js",
    "bower_components/spectrum/spectrum.js",
    "bower_components/remodal/dist/remodal.min.js",
    "app/js/vendor/autoscroll.js",
    "app/js/vendor/jq-helpers.js"
];
gulp.task('vendorjs',function () {
    return gulp.src(vendorScripts)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('vendor.js'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/js"));
});
gulp.task('copy-tinymce', function() {
    return gulp.src([
        'bower_components/tinymce/plugins/**/*',
        'bower_components/tinymce/skins/**/*',
        'bower_components/tinymce/themes/**/*'
    ],{base:"bower_components/tinymce"})
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts',['js','vendorjs','copy-tinymce'], function () {

});

gulp.task('build',['styles','scripts'], function () {

});

gulp.task('default', ['styles','scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/js/app/**/*.js', ['js']);
});


//////

function swallowError (error) {
  console.log(error.toString());
  this.emit('end')
}