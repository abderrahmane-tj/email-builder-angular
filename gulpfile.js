const gulp = require('gulp');
const gutil = require('gulp-util');
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
let doSourcemaps = true;
let production = false;

gulp.task('sass', function() {
    return gulp.src('app/sass/app.scss')
    .pipe(doIdoSourcemaps())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest('./build/app/css'));
});
gulp.task('fonts', function() {
    return gulp.src('bower_components/font-awesome/fonts/**')
    .pipe(gulp.dest('./build/app/fonts'));
});
gulp.task('images', function() {
    return gulp.src('app/img/**')
    .pipe(gulp.dest('./build/app/img'));
});
gulp.task('vendorcss',function () {
    return gulp.src([
        "bower_components/angular-dragula/dist/dragula.min.css",
        "bower_components/spectrum/spectrum.css",
        "bower_components/font-awesome/css/font-awesome.min.css",
        "bower_components/remodal/dist/remodal.css",
        "bower_components/remodal/dist/remodal-default-theme.css"
    ])
        .pipe(doIdoSourcemaps())
        .pipe(concat('vendor.css'))
        .pipe(production ? cleanCSS({compatibility: 'ie8'}) : gutil.noop())
        .on('error', swallowError)
        .pipe(doIWriteSourcemaps())
        .pipe(gulp.dest('./build/app/css'));
});
gulp.task('styles',['sass','fonts','images','vendorcss']);


gulp.task('js',function () {
    return gulp.src(['app/js/app/**/*.js','./build/app/js/templates.js'])
    .pipe(doIdoSourcemaps())
    .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();'))
    .pipe(concat('app.js'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('bower_components',function () {
    return gulp.src([
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/tinymce/tinymce.min.js",
        "bower_components/angular/angular.min.js",
        "bower_components/angular-sanitize/angular-sanitize.min.js",
        "bower_components/angular-dragula/dist/angular-dragula.min.js",
        "bower_components/store-js/store.min.js",
        "bower_components/remodal/dist/remodal.min.js"
    ])
    .pipe(doIdoSourcemaps())
    .pipe(concat('bower_components.js'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('appvendorjs',function () {
    return gulp.src([
        "./app/js/vendor/*",
        "./bower_components/spectrum/spectrum.js"
    ])
    .pipe(doIdoSourcemaps())
    .pipe(uglify())
    .pipe(concat('app_vendor.js'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('textareajs',function () {
    return gulp.src([
        "app/js/helpers/email-builder.jquery.js"
    ])
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('previewvendorjs',function () {
    return gulp.src([
        "bower_components/jquery/dist/jquery.min.js"
    ])
    .pipe(doIdoSourcemaps())
    .pipe(concat('preview_vendor.js'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('vendorjs',['appvendorjs','previewvendorjs','textareajs','bower_components'],function () {
    return gulp.src([
        "./build/app/js/bower_components.js",
        "./build/app/js/app_vendor.js"
    ])
    .pipe(doIdoSourcemaps())
    .pipe(concat('vendor.js'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('copy-tinymce', function() {
    return gulp.src([
        'bower_components/tinymce/plugins/**/*',
        'bower_components/tinymce/skins/**/*',
        'bower_components/tinymce/themes/**/*'
    ],{base:"bower_components/tinymce"})
    .pipe(gulp.dest('./build/app/js'));
});
gulp.task('scripts',['js','vendorjs','copy-tinymce']);

gulp.task('cache-templates',function () {
    return gulp.src('app/templates/**/*.html')
        .pipe(templateCache({
            root: 'app/templates',
            module: 'emailApp'
        }))
        .pipe(gulp.dest('./build/app/js'));
});

gulp.task('build',['styles','cache-templates', 'scripts']);
gulp.task('minifyjs',['build'],function(){
    return gulp.src(['./build/app/js/app.js'])
    .pipe(doIdoSourcemaps())
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('minifycss',['build'],function(){
    return gulp.src('./build/app/css/app.css')
    .pipe(doIdoSourcemaps())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/css"));
});
gulp.task('email-builder',['minifyjs','minifycss'],function () {
    gulp.src(['./build/app/css/vendor.css','./build/app/css/app.css'])
    .pipe(doIdoSourcemaps())
    .pipe(concat('email-builder.css'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/css"));
    gulp.src(['./build/app/js/vendor.js','./build/app/js/app.js'])
    .pipe(doIdoSourcemaps())
    .pipe(concat('email-builder.js'))
    .on('error', swallowError)
    .pipe(doIWriteSourcemaps())
    .pipe(gulp.dest("./build/app/js"));
});
gulp.task('bootstrap',function () {
    doSourcemaps = false;
    production = true;
});
gulp.task('production',['bootstrap','email-builder']);

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
function doIdoSourcemaps(){
    return doSourcemaps ? sourcemaps.init({loadMaps: true}) : gutil.noop();
}
function doIWriteSourcemaps(){
    return doSourcemaps ? sourcemaps.write('.') : gutil.noop();
}