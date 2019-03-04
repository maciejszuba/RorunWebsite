'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var bower = require('gulp-bower');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});

var mainStyleSrc = 'dev/style/style.styl';
var jsDevDirectory = 'dev/js/**/*.js';
var distDirectory = 'dist/';

gulp.task('stylus', function() {

    var plugins = [
        autoprefixer
    ];

    gulp.src(mainStyleSrc)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .on('error', displayError)
        .pipe(postcss(plugins))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDirectory + 'css/'))
        .pipe(livereload());

});

gulp.task('js', function() {

    gulp.src(jsDevDirectory)
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .on('error', displayError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDirectory + 'js/'))
        .pipe(livereload());

});

gulp.task('watch', function() {

    livereload.listen();
    gulp.watch('dev/js/**/*.js', ['js']);
    gulp.watch('dev/style/**/*.styl', ['stylus']);

});

function displayError(error) {

    console.log(error.toString())
    this.emit('end')

}

gulp.task('bower', function() {
    return bower();
});


gulp.task('dev', ['watch']);

gulp.task('bower-dev', ['bower']);