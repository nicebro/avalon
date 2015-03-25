var gulp = require('gulp'),  
	less = require('gulp-less'),
	minify = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./public/"
		},
		open: false,
	});
});

var paths = {  
	'src': {
		'less': './src/less/',
		'js': './src/js/',
		'jade': './src/jade/'
	},
	'assets': {
		'css': './public/assets/css/',
		'js': './public/assets/js/',
		'fonts': './public/assets/fonts/',
		'vendor': './bower_components/'
	}
};

function catchError(error) { 
	console.log(error.toString());
	this.emit('end'); 
}

gulp.task('css', function() {  
	gulp.src([
		paths.src.less + 'styles.less',
	])
	.pipe(less()).on('error', catchError)
	.pipe(gulp.dest(paths.assets.css)) 
	//.pipe(minify({keepSpecialComments:0}))
	//.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.assets.css))
	.pipe(browserSync.reload({stream:true}));	

	gulp.src([
		paths.assets.vendor + 'bootstrap/dist/css/bootstrap.min.css',
	])
	.pipe(gulp.dest(paths.assets.css));
});

gulp.task('js', function() {  
	return gulp.src([
		paths.assets.vendor + 'jquery/dist/jquery.js',
		paths.assets.vendor + 'bootstrap/dist/js/bootstrap.min.js',
		paths.assets.vendor + 'sequence/scripts/jquery.sequence.js',
		paths.src.js + 'scripts.js'
	])
	//.pipe(concat('scripts.js'))
	.pipe(gulp.dest(paths.assets.js))
	//.pipe(uglify()).on('error', catchError)
	//.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.assets.js))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('jade', function() {
	gulp.src(['src/jade/*.jade'])
	.pipe(jade({
		pretty: true
	})).on('error', catchError)
	.pipe(gulp.dest('./public/'));
});

gulp.task('watch', ['browser-sync', 'css', 'js', 'jade'], function() {  
	gulp.watch(paths.src.less + '**/*.less', ['css', browserSync.reload]);
	gulp.watch(paths.src.js + '*.js', ['js', browserSync.reload]);
	gulp.watch(paths.src.jade + '**/*.jade', ['jade', browserSync.reload]);
});
