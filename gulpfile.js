const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const wrap = require("gulp-wrap");
const sourcemaps = require('gulp-sourcemaps');
const templateCache = require('gulp-angular-templatecache');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

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
gulp.task('vendorcss',function () {
    return gulp.src([
        "bower_components/angular-dragula/dist/dragula.min.css",
        "bower_components/spectrum/spectrum.css",
        "bower_components/font-awesome/css/font-awesome.min.css",
        "bower_components/remodal/dist/remodal.css",
        "bower_components/remodal/dist/remodal-default-theme.css"
    ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('vendor.css'))
        .on('error', swallowError)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('styles',['sass','fonts','vendorcss']);


gulp.task('js',function () {
    return gulp.src(['app/js/app/**/*.js','dist/js/templates.js'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(concat('app.js'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/js"));
});
gulp.task('bower_components',function () {
    gulp.src([
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/tinymce/tinymce.min.js",
        "bower_components/angular/angular.min.js",
        "bower_components/angular-sanitize/angular-sanitize.min.js",
        "bower_components/angular-dragula/dist/angular-dragula.min.js",
        "bower_components/store-js/store.min.js",
        "bower_components/remodal/dist/remodal.min.js"
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('bower_components.js'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/js"));
});
gulp.task('appvendorjs',function () {
    gulp.src([
        "./app/js/vendor/*",
        "./bower_components/spectrum/spectrum.js"
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(concat('app_vendor.js'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/js"));
});
gulp.task('vendorjs',['appvendorjs','bower_components'],function () {
    gulp.src([
        "./dist/js/bower_components.js",
        "./dist/js/app_vendor.js"
    ])
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
gulp.task('scripts',['js','vendorjs','copy-tinymce']);

gulp.task('cache-templates',function () {
    return gulp.src('app/templates/**/*.html')
        .pipe(templateCache({
            root: 'app/templates',
            module: 'emailApp'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build',['styles','cache-templates', 'scripts']);
gulp.task('minifyjs',function(){
    return gulp.src(['dist/js/app.js'])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/js"));
});
gulp.task('minifycss',function(){
    return gulp.src('dist/css/app.css')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9'))
    .on('error', swallowError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"));
});
gulp.task('production',['build','minifyjs','minifycss']);

gulp.task('default', ['build'], function() {
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/js/app/**/*.js', ['js']);
    gulp.watch('app/templates/**/*', ['cache-templates','js']);
});


//////

function swallowError (error) {
  console.log(error.toString());
  this.emit('end')
}