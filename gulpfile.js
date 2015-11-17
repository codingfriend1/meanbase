/**
 * @overview Defines 
 * gulp install - Establishes app so its ready for development preview
 * 	Installs npm and bower.
 * 	Compiles jade into .tmp
 * 	Injects stylus files into app.styl
 * 	Compiles app.styl to .tmp
 * 	Injects vendor and app scripts and styles into server/views/index.html
 * 	
 * gulp compose
 * 	Does everything install does except for npm and bower
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 */
var gulp = require('gulp'),
		merge = require('merge-stream'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		stylus = require('gulp-stylus'),
		gulpif = require('gulp-if'),
		minifyCss = require('gulp-minify-css'),
		mainBowerFiles = require('main-bower-files'),
		angularFilesort = require('gulp-angular-filesort'),
		es = require('event-stream'),
		inject = require('gulp-inject'),
		del = require('del'),
		runSequence = require('run-sequence'),
		run = require('gulp-run'),
		server = require('gulp-express'),
		jade = require('jade'),
		gulpJade = require('gulp-jade'),
		jasmine = require('gulp-jasmine'),
		karma = require('karma').server,
		series = require('stream-series'),
		fs = require('fs'),
		path = require('path'),
		ngAnnotate = require('gulp-ng-annotate'),
		ngtemplate = require('gulp-ng-templates'),
		htmlmin = require('gulp-htmlmin'),
		debug = require('gulp-debug');

var requireDir = require('require-dir');
		tasks = requireDir('./tasks');

var config = {
	themesFolder: 'client/themes/'
};

gulp.task('default', function() {
	
});

gulp.task('compose', function() {
	runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
});

// Setup
gulp.task('install', ['clean:tmp'], function() {
	run('npm install').exec('', function() {
		run('bower install').exec('', function() {
			runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
		});
	});
});