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
// var gulp = require('gulp'),
// 		merge = require('merge-stream'),
// 		uglify = require('gulp-uglify'),
// 		concat = require('gulp-concat'),
// 		stylus = require('gulp-stylus'),
// 		gulpif = require('gulp-if'),
// 		minifyCss = require('gulp-minify-css'),
// 		mainBowerFiles = require('main-bower-files'),
// 		angularFilesort = require('gulp-angular-filesort'),
// 		es = require('event-stream'),
// 		inject = require('gulp-inject'),
// 		del = require('del'),
// 		runSequence = require('run-sequence'),
// 		run = require('gulp-run'),
// 		server = require('gulp-express'),
// 		jade = require('jade'),
// 		gulpJade = require('gulp-jade'),
// 		jasmine = require('gulp-jasmine'),
// 		karma = require('karma').server,
// 		series = require('stream-series'),
// 		fs = require('fs'),
// 		path = require('path'),
// 		ngAnnotate = require('gulp-ng-annotate'),
// 		ngtemplate = require('gulp-ng-templates'),
// 		htmlmin = require('gulp-htmlmin'),
// 		debug = require('gulp-debug');

var exec = require('child_process').exec;
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', 'run-sequence', 'merge-stream', 'main-bower-files', 'event-stream'],
    rename: {
      'event-stream': 'es'
    },
    config: path.join(__dirname, 'package.json'),
    lazy: false
});

plugins.path = path;

var config = {
	themesFolder: 'client/themes/',
	getFolders: function(dir) {
	  return fs.readdirSync(dir)
	    .filter(function(file) {
	      return fs.statSync(path.join(dir, file)).isDirectory();
	    });
	},
  runCommand: function(command) {
    return function (cb) {
      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    }
  }
};

var tasks = fs.readdirSync(path.join(__dirname, 'tasks')).filter(function(file) {
  return fs.statSync(path.join(__dirname, 'tasks', file)).isFile();
});

tasks.forEach(function (file) {
	require( path.join(__dirname, 'tasks', file))(gulp, plugins, config);
});

gulp.task('default', function() {

});

gulp.task('compose', function() {
	plugins.runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
});

// Setup
gulp.task('install', ['clean:tmp'], function() {
	// plugins.run('npm install').exec('', function() {
		plugins.run('bower install').exec('', function() {
			plugins.runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
		});
	// });
});

gulp.task('empty-database', function() {
  config.runCommand('mongo --eval "show dbs; use meanbase-dev; db.dropDatabase();"');
});
