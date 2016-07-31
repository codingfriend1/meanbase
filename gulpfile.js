var gulp = require('gulp')
var path = require('path')
var fs = require('fs')

var folders = {
  admin: {
    root: path.resolve(__dirname, 'client', 'admin'),
    code: path.resolve(__dirname, 'client', 'admin', 'code'),
    shared: path.resolve(__dirname, 'client', 'shared'),
    gulp: path.resolve(__dirname, 'gulp', 'admin'),
    bower: path.resolve(__dirname, 'client', 'admin', 'bower_components')
  },
  app: {
    gulp: path.resolve(__dirname, 'gulp', 'app'),
    root: path.resolve(__dirname, 'client', 'app'),
    shared: path.resolve(__dirname, 'client', 'shared'),
    bower: path.resolve(__dirname, 'client', 'app', 'bower_components')
  }
}

var config = {
  path: path
}

/**
 * We add all our gulp modules to the plugins object so we don't have to import their scripts in every file
 */
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', 'run-sequence', 'merge-stream', 'main-bower-files', 'event-stream', 'browser-sync', 'debug'],
    rename: {
      'event-stream': 'es'
    },
    config: path.resolve(__dirname, 'package.json'),
    lazy: false
})

/**
 * Collect all the applications in gulp folder
 */
var adminTasks = fs.readdirSync(folders.admin.gulp).filter(function(file) {
 return fs.statSync(path.join(folders.admin.gulp, file)).isFile()
})

adminTasks.forEach(function (file) {
	require( path.join(folders.admin.gulp, file))(gulp, plugins, folders.admin, config)
})
// var appTasks = fs.readdirSync(folders.app.gulp).filter(function(file) {
//  return fs.statSync(path.join(folders.app.gulp, file)).isFile()
// })
//
// appTasks.forEach(function (file) {
// 	require( path.join(folders.app.gulp, file))(gulp, plugins, folders.app, config)
// })

 /**
 * Require each file in the gulp folder and pass in gulp, the plugins, and any configuration
 */

gulp.task('admin', function() {
  plugins.runSequence(['copy-fonts', 'create-bower.js', 'import-admin'])
})
