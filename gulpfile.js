var gulp         = require('gulp'),
    del          = require('delete'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    cleanCSS     = require('gulp-clean-css'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');
		
var dist_path1   = './dist/';

gulp.task( 'clean', function(cb) {
	del.sync( [ dist_path1 + '**', '!' + dist_path1 ], { force: true } );
	cb();
});

gulp.task( 'copy', function() {
	return gulp.src( [ 'src/**/*', '!src/style.css', '!src/js/*', '!src/sass/*' ] )
		.pipe( gulp.dest( dist_path1 ) );
});

gulp.task( 'vendorjs', function() {
    return gulp.src( [ 'src/js/*.js', '!src/js/index.js' ] )
		.pipe( uglify() )
		.pipe( concat('vendor.js') )
		.pipe( gulp.dest( dist_path1 + '/js/' ) );
});

gulp.task( 'js', function() {
    return gulp.src( [ 'src/js/index.js' ] )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.write() )
		.pipe( uglify() )
		.pipe( gulp.dest( dist_path1 + '/js/' ) );
});

gulp.task( 'css', function() {
		return gulp.src( 'src/sass/*.scss', { sourcemap: true } )
		.pipe( sourcemaps.init() )
		.pipe( sass().on( 'error', sass.logError ))
		.pipe( autoprefixer({ browsers:['last 2 versions'],cascade:false }) )
		.pipe( sourcemaps.write() )
		.pipe( cleanCSS() )
		.pipe( rename('style.css') )
		.pipe( gulp.dest( dist_path1 ) );
});

gulp.task( 'watch', function() {
	gulp.watch( 'src/sass/**/*.scss', [ 'css' ] );
	gulp.watch( 'src/js/index.js', [ 'js' ] );
	gulp.watch( 'src/index.php', [ 'copy' ] );
});

gulp.task( 'build', [ 'clean', 'copy', 'vendorjs', 'js', 'css' ] );
