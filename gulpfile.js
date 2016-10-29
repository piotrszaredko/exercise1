//REQUIRED
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence'),
	rename = require('gulp-rename'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;
    livereload = require('gulp-livereload');
//WATCH
gulp.task('watch', function(){
   livereload.listen(); 
    gulp.watch('*', livereload.reload);
});
gulp.task('watch2', function(){
    gulp.watch('*', livereload.reload);
});

//HTML
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});
//BUILD
//clear build folder
gulp.task('build:cleanfolder', function(cb){
	del([
		'build/**'
	],cb);
});
//create build folder
gulp.task('build:copy',  function(){
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});
//remove build files
gulp.task('build:remove',['build:copy'], function(cb){
	del([
		'build/js/!(*.min.js)',
		'build/css/!(*.min.css)'
	],cb);
});
gulp.task('build',['build:copy','build:remove','build:serve']);
//SASS
gulp.task('compass', function(){
	return gulp.src('app/css/**/*.css')
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream:true}));
});
gulp.task('min:remove', function(){
	del([
		'app/css/*.min.css',
		'app/js/*.min.js'
	]);
	console.log('\nRemove min JS and CSS.\n');
});
gulp.task('min:add',['compass','scripts'], function(){
	console.log('\nAdd min JS and CSS.\n');
});
//BROWERS-SYNC
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir:"./app/"
		}
	})
});
//BUILD BROWSER SUNC
gulp.task('build:serve', function(){
	browserSync({
		server:{
			baseDir:"./build/"
		}
	})
});
//SCRIPTS
gulp.task('scripts', function(){
	return gulp.src([
		'app/bower_components/angular/angular.min.js',
		'app/bower_components/jquery/dist/jquery.js',
		'app/bower_components/chart.js/dist/Chart.js',
		'app/js/**/*.js',
		'!app/js/**/*/min.js'
	])
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}));
});
//Sequence for min:remove and min:add
gulp.task('sequence', function(){
	runSequence('min:remove','min:add')
});
//DEF TASK
gulp.task('default', ['sequence','browser-sync','html'] );