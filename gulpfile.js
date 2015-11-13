var gulp = require('gulp');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var gulpFilter = require('gulp-filter');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var gulpif = require('gulp-if');

var usemin = require('gulp-usemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var mainBowerFiles = require('main-bower-files');
var angularFilesort = require('gulp-angular-filesort');

var es = require('event-stream');
var inject = require('gulp-inject');

var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

var jade = require('gulp-jade');

var jasmine = require('gulp-jasmine');
var run = require('gulp-run');
var server = require('gulp-express');

var jade = require('jade');
var gulpJade = require('gulp-jade');

gulp.task('default', function() {
	
});

gulp.task('jade', function() {
	return gulp.src('client/{app, components}/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('client/'));
});

gulp.task('stylus', function() {
	gulp.src('client/app/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('client/app/'));
});

gulp.task('serve', function() {
	

  server.run(['server/app.js']);

  gulp.watch(['client/**/*.styl'], ['stylus']);

  gulp.watch([
  	'client/{app,components}/**/*.html',
  	'client/{app,components}/**/*.js',
  	'client/{app,components}/**/*.css',
  	'server/**'
  ], server.notify);
});

gulp.task('install', function() {
	run('npm install').exec('', function() {
		run('bower install').exec();
	});
});

gulp.task('clean', function () {  
	return del('build/**');
});

gulp.task('copy', function () {
	return merge(
		gulp.src(['client/{themes,extensions}/**', 'client/*', 'client/assets/**'])
			.pipe(gulpif('*.jade', gulpJade({
	      jade: jade,
	      pretty: true
	    })))
	  	.pipe(gulp.dest('build/public/')),

	  gulp.src(['server/**'])
	  	.pipe(gulp.dest('build/server/')),

	  gulp.src('package.json')
	  	.pipe(gulp.dest('build/'))
	 );
});

gulp.task('build', function(done) {
	runSequence('clean', 'copy', function() {
		var vendorJS = gulp.src(mainBowerFiles('**/*.js'))
      .pipe(concat('vendors.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/public/app/'));

		var vendorCSS = gulp.src(mainBowerFiles('**/*.css'))
      .pipe(concat('vendors.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('build/public/app/'));

    var appJS = gulp.src(['client/{app,components}/**/*.js', '!**/*spec.js', '!**/*mock.js'])
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/public/app/'));

    var appCSS = gulp.src('client/app/app.styl')
      .pipe(stylus())
      .pipe(concat('app.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('build/public/app/'));
    gulp.src('client/index.html')
      .pipe(inject(es.merge(vendorJS, vendorCSS, appJS, appCSS)))
      .pipe(gulp.dest('build/public'));
    done();
  });
});

gulp.task('test', function () {
  return gulp.src(['**/*spec.js', '**/*mock.js'])
  	.pipe(jasmine());
});

gulp.task('watch', function() {

	// gulp.src([
	// 	'client/{app,components}/**/*.css',
	// 	'client/{app,components}/**/*.html',
	// 	'client/{app,components}/**/*.js'
	// ])
});