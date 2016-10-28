//REQUIRED
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
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
gulp.task('build',['build:copy','build:remove']);
//SASS
gulp.task('compass', function(){
	gulp.src('app/css/**/*.css')
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css/'))
	.pipe(reload({stream:true}));
});
gulp.task('min:remove', function(){
	del([
		'app/css/*.min.css',
		'app/js/*.min.js'
	]);
});
gulp.task('min:add',['compass','scripts'], function(){
	console.log('\nAdd min JS and CSS.\n')
})
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
})
//SCRIPTS
gulp.task('scripts', function(){
	-----------------------------------------------------gulp.src(['app/bower_components/angular/*.js','app/js/**/*.js', '!app/js/**/*/min.js'])
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/js'))
	.pipe(reload({stream:true}));
});
//DEF TASK
gulp.task('default', ['scripts','compass','browser-sync','html'] );