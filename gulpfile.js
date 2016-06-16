var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    vulcanize = require('gulp-vulcanize'),
    autoprefixer = require('gulp-autoprefixer'),
    crisper = require('gulp-crisper'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps');

/**
 * Compile all .scss files in components directory
 * and auto-prefix before save back to same directory
 *
 * Compile all .scss files in app directory
 * and auto-prefix before save back to same directory
 */
gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', console.log))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/'));
});

/**
 * Vulcanize everything in the app directory and no other.
 * The idea is that components are never stand-alone,
 * they are always used in an app. So only things in app dir
 * are converted into a standalone Polymer components that
 * can be imported.
 */
gulp.task('vulcanize', ['sass'], function () {
    return gulp.src(['./src/my-crappy-homepage-app/my-crappy-homepage-app.html'])
        .pipe(vulcanize({inlineCss: true, inlineScripts: true})
            .on('error', console.log))
        .pipe(gulp.dest('./dist/'));

});

/**
 * Watch for any html/scss changes in component or app directory.
 */
gulp.task('watch', function () {
    gulp.watch('./src/**/*.html', ['sass', 'vulcanize']);
    gulp.watch('./src/**/*.scss', ['sass', 'vulcanize']);
});

gulp.task('build', function () {
    return gulp.src('./bower_components/webcomponentsjs/webcomponents-lite.min.js')
        .pipe(gulp.dest('./public/scripts'));
});

