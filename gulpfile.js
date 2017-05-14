var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();


// css task
gulp.task('css' , function(){
    return gulp.src(['./src/sass/*.scss'])
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on('error', plugin.sass.logError))
    .pipe(plugin.cssmin())
    .pipe(plugin.autoprefixer())
    .pipe(plugin.sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());

});
// js
gulp.task('js' , function(){
    return gulp.src(['./src/js/*.js'])
    .pipe(plugin.concat('main.js'))
    .pipe(plugin.uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

//watch file for changes

gulp.task('watch' , function(){
    gulp.watch(['./src/sass/*.scss'], ['css']);
    gulp.watch(['./src/js/*.js'],['js']);

});


// serve task
gulp.task('serve' , function(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload);

});


//default task

gulp.task('default' , ['css' , 'js', 'watch' , 'serve']);
