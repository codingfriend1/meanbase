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

var exec = require('child_process').exec;
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', 'run-sequence', 'merge-stream', 'main-bower-files', 'event-stream', 'browser-sync'],
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
  plugins.runSequence('install', 'build-themes', 'serve');
});

gulp.task('compose', function() {
	plugins.runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
});

// Setup
gulp.task('install', ['clean:tmp'], function() {
	// plugins.run('npm install').exec('', function() {
		// plugins.run('bower install').exec('', function() {
			plugins.runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
		// });
	// });
});

gulp.task('empty-database', function() {
  config.runCommand('mongo --eval "show dbs; use meanbase-dev; db.dropDatabase();"');
});
