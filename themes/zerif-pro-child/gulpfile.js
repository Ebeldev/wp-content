'use strict';

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    coffee          = require('gulp-coffee'),
    plumber         = require('gulp-plumber'),
    compass         = require('gulp-compass'),
    imagemin        = require('gulp-imagemin'),
    cleanCSS        = require('gulp-clean-css'),
    browserSync     = require('browser-sync').create();

gulp.task('compass', function() {
  gulp.src('./scss/*.scss')
    .pipe(plumber({
        errorHandler:function(error) {
            console.log(error.message);
            this.emit('end');
    }}))
    .pipe(compass({
      config_file: './compassmini/config.rb',
      includePaths: [
           './node_modules/compass-mixins/lib' // Add this bit just here =D
          ],
      css: './css/',
      sass: './sass/'
    }))
    .pipe(gulp.dest('./'));
});

// Task for CoffeeScript
gulp.task('coffee', function(){
    gulp.src('js/*.coffee')
        .pipe(coffee({
            bare:true
        }))
        .pipe(gulp.dest('js'));
});



// Task for Watch
gulp.task('watch', function(){
    gulp.watch('js/*.coffee', ['coffee']).on('change', function(event){
        console.log('Le fichier ' + event.path + ' a ete modifie');
    });
    gulp.watch('sass/*.scss', ['sass']).on('change', function(event){
        console.log('Le fichier ' + event.path + ' a ete modifie');
    });
});

// Task for Browser-sync
// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function(){
    /*Static Server
    browserSync.init({
        server:"./"
    });
*/
    //Proxy server
    browserSync.init({
        proxy: "http://localhost/etienne2016/"
    });
    
    gulp.watch("sass/*.scss", ['sass']).on('change', function(event){
        console.log('Le fichier ' + event.path + ' a ete modifie')});
    gulp.watch("/**/*.php").on('change', browserSync.reload);
    gulp.watch("/**/*.html").on('change', browserSync.reload);
});

// Task for Sass
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// GULP Default task
gulp.task('default', ['coffee', 'serve'], function(){
    gulp.src('img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));

    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});