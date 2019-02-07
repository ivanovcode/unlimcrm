var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat'); 
var concatCss = require('gulp-concat-css');
var htmlmin = require('gulp-html-minifier');
var cachebust = require('gulp-cache-bust');
 var cleanhtml = require('gulp-cleanhtml');
 var uglifycss = require('gulp-uglifycss');
var removeFiles = require('gulp-remove-files');
/*var del = require('del');*/


gulp.task('css', function () {
  	return gulp.src([
		'css/custom/fonts.css',
		'lib/css/bootstrap.min.css',
		'lib/css/font-awesome.min.css',
		'lib/css/animate.min.css',
		'lib/css/bootstrap-switch.min.css',
		'lib/css/checkbox3.min.css',
		'lib/css/jquery.dataTables.min.css',
		'lib/css/dataTables.bootstrap.css',
		'lib/css/select2.min.css',
		'lib/css/bee3D/bee3D.css',
		'lib/css/bee3D/demo.css',
		'lib/css/nprogress.css',
		'lib/css/sumoselect.min.css',
		'css/app.css'
  	])
    .pipe(concatCss("app.min.css"))
    .pipe(gulp.dest('dashboard/'));
});

gulp.task('minify-vendor', function() {
  	return gulp.src([
		'lib/js/jquery.min.js',
		'lib/js/bootstrap.min.js',
		'lib/js/Chart.min.js',
		'lib/js/bootstrap-switch.min.js',
		'lib/js/jquery.matchHeight-min.js',
		'lib/js/jquery.dataTables.min.js',
		'lib/js/dataTables.bootstrap.min.js',
		'lib/js/select2.full.min.js',
		'lib/js/ace/ace.js',
		'lib/js/ace/mode-html.js',
		'lib/js/ace/theme-github.js',
		'lib/js/jquery/3.0.0/jquery.min.js',
		'lib/js/bee3D/vendor/classie.js',
		'lib/js/bee3D/bee3D.js',
		'lib/js/nprogress.js',
		'lib/js/jquery.sumoselect.min.js',
		'lib/js/createjs-2015.11.26.min.js',
		'js/app.js',      
		'js/custom/loader.js',
		'js/custom/waterbubble.js'
  	])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dashboard/'));
});
/*gulp.task('minify-app', function() {
  	return gulp.src([
		'js/custom/index.js'
  	])
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('dashboard/'));
});*/


gulp.task('concat', function() {
  	return gulp.src([
  		'js/custom/cat.js',
  		'dashboard/vendor.min.js',
  		'js/custom/index.js'
		
  	])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dashboard/'));
});

gulp.task('html', function() {
  	gulp.src([		
		'src/index.html'
  	])

    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('dashboard/'))
});


/*gulp.task('clean', function(){
  return del(['dashboard/vendor.min.js']);
});*/



gulp.task('default', ['minify-vendor', 'concat', 'css', 'html']);



