var gulp = require('gulp')
var path = require('path')
var fs = require('fs')
var async = require('async')

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
  },
  themes: {
    root: path.resolve(__dirname, 'client', 'themes'),
    gulp: path.resolve(__dirname, 'gulp', 'themes')
  },
  extensions: {
    root: path.resolve(__dirname, 'client', 'extensions'),
    gulp: path.resolve(__dirname, 'gulp', 'extensions')
  },
}

var themes = fs.readdirSync(folders.themes.root).filter(function(file) {
 return fs.statSync(path.join(folders.themes.root, file)).isDirectory()
})

var extensions = fs.readdirSync(folders.extensions.root).filter(function(file) {
 return fs.statSync(path.join(folders.extensions.root, file)).isDirectory()
})

folders.themes.themes = themes
folders.extensions.extensions = extensions

var config = {
  path: path,
  async: async
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

var appTasks = fs.readdirSync(folders.app.gulp).filter(function(file) {
 return fs.statSync(path.join(folders.app.gulp, file)).isFile()
})

appTasks.forEach(function (file) {
	require( path.join(folders.app.gulp, file))(gulp, plugins, folders.app, config)
})

var themeTasks = fs.readdirSync(folders.themes.gulp).filter(function(file) {
 return fs.statSync(path.join(folders.themes.gulp, file)).isFile()
})

themeTasks.forEach(function (file) {
	require( path.join(folders.themes.gulp, file))(gulp, plugins, folders.themes, config)
})

var extensionTasks = fs.readdirSync(folders.extensions.gulp).filter(function(file) {
 return fs.statSync(path.join(folders.extensions.gulp, file)).isFile()
})

extensionTasks.forEach(function (file) {
	require( path.join(folders.extensions.gulp, file))(gulp, plugins, folders.extensions, config)
})

 /**
 * Require each file in the gulp folder and pass in gulp, the plugins, and any configuration
 */

gulp.task('admin', function(done) {
  plugins.runSequence('copy-fonts-admin', 'create-bower-admin', 'import-admin', done)
})

gulp.task('app', function(done) {
  plugins.runSequence('copy-fonts-app', 'create-bower-app', 'import-app', done)
})

gulp.task('themes', function(done) {
  plugins.runSequence('import-themes', done)
})

gulp.task('extensions', function(done) {
  plugins.runSequence('import-extensions', done)
})

gulp.task('default', function(done) {
  plugins.runSequence('admin', 'app', 'themes', 'extensions', done)
});
