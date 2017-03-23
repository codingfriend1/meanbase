const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const inject = require('gulp-inject');
const runSequence = require('run-sequence')

const folders = {
  app: path.resolve(__dirname, 'app'),
  components: path.resolve(__dirname, 'app', 'components'),
  schemas: path.resolve(__dirname, 'shared', 'schemas'),
  css: path.resolve(__dirname, 'app', 'css'),
  views: path.resolve(__dirname, 'app', 'views'),
  root: path.resolve(__dirname),
  shared: {
    app: path.resolve(__dirname, 'shared'),
    components: path.resolve(__dirname, 'shared', 'components'),
    css: path.resolve(__dirname, 'shared', 'css'),
    views: path.resolve(__dirname, 'shared', 'views'),
    root: path.resolve(__dirname),
  },
  admin: {
    app: path.resolve(__dirname, 'admin'),
    components: path.resolve(__dirname, 'admin', 'components'),
    css: path.resolve(__dirname, 'admin', 'css'),
    views: path.resolve(__dirname, 'admin', 'views'),
    root: path.resolve(__dirname),
  }
}

function generateInject(injectTo, outputFolder, arrayOfFilesToInject, startTag, importStatement, extractFileName) {
  var importStatement = importStatement || 'import'
  return gulp.src(injectTo)
    .pipe(inject(gulp.src(arrayOfFilesToInject, {
      read: false
    }), {
      relative: true,
      starttag: "// " + startTag,
      endtag: "// end " + startTag,
      transform: function(filepath, file, i, length) {
        if(extractFileName) {
          var title = filepath.replace(/^.*[\\\/]/, '')
          title = title.substr(0, title.lastIndexOf('.')).replace('-', '_')
          if(importStatement !== 'require') {
            if (filepath.indexOf('..') !== -1) {
              return importStatement + ' ' + title + ' from "' + filepath + '"'
            } else {
              return importStatement + ' ' + title + ' from "./' + filepath + '"'
            }
          } else {
            if (filepath.indexOf('..') !== -1) {
              return title + ': require("' + filepath + '"),'
            } else {
              return title + ': require("./' + filepath + '"),'
            }
          }

        } else {
          if (filepath.indexOf('..') !== -1) {
            return importStatement + ' "' + filepath + '"'
          } else {
            return importStatement + ' "./' + filepath + '"'
          }
        }
      }
    }))
    .pipe(gulp.dest(outputFolder))
}

gulp.task('inject-component-js', function() {
  return generateInject(
    path.join(folders.components, 'index.js'),
    folders.components,
    [
      folders.components + '/**/*.js',
      '!**/*spec.js',
      '!**/*mock.js',
    ],
    'inject component js'
  )
})

gulp.task('inject-shared-component-js', function() {
  return generateInject(
    path.join(folders.shared.components, 'index.js'),
    folders.shared.components,
    [
      folders.shared.components + '/**/*.js',
      '!**/*spec.js',
      '!**/*index.js',
      '!**/*mock.js',
    ],
    'inject shared components js'
  )
})

gulp.task('inject-vue', function() {
  return generateInject(
    path.join(folders.views, 'index.js'),
    folders.views,
    [
      folders.app + '/views/**/*.vue',
      '!' + folders.app + '/views/app.vue'
    ],
    'inject vue'
  )
})

gulp.task('inject-css', function() {
  return generateInject(
    path.join(folders.css, 'app.styl'),
    folders.css,
    [
      folders.app + '/components/**/*.css',
      folders.app + '/css/**/*.css',
      folders.app + '/components/**/*.styl',
      folders.app + '/css/**/*.styl',
      folders.shared.app + '/**/*.styl',
      folders.shared.app + '/**/*.css',
      "!**/vendor.scss",
      "!**/app.styl",
    ],
    'inject css',
    '@import'
  )
})

gulp.task('inject-views', function() {
  return generateInject(
    path.join(folders.shared.app, 'routes.js'),
    folders.shared.app,
    [
      folders.views + '/**/*.vue',
      folders.admin.views + '/**/*.vue',
      '!' + folders.views + '/**/app.vue',
      '!' + folders.admin.views + '/**/app.vue',
    ],
    'inject views',
    'import',
    true
  )
})

gulp.task('inject-admin-component-js', function() {
  return generateInject(
    path.join(folders.admin.components, 'index.js'),
    folders.admin.components,
    [
      folders.admin.components + '/**/*.js',
      '!' + folders.admin.components + '/index.js',
      '!**/*spec.js',
      '!**/*mock.js',
    ],
    'inject component js'
  )
})

gulp.task('inject-admin-vue', function() {
  return generateInject(
    path.join(folders.admin.views, 'index.js'),
    folders.admin.views,
    [
      folders.admin.views + '/**/*.vue',
      '!' + folders.admin.views + '/app.vue',
    ],
    'inject vue'
  )
})

gulp.task('inject-admin-css', function() {
  return generateInject(
    path.join(folders.admin.css, 'app.styl'),
    folders.admin.css,
    [
      folders.admin.app + '/components/**/*.css',
      folders.admin.app + '/css/**/*.css',
      folders.admin.app + '/components/**/*.styl',
      folders.admin.app + '/css/**/*.styl',
      folders.shared.app + '/**/*.styl',
      folders.shared.app + '/**/*.css',
      "!**/vendor.scss",
      "!**/app.styl",
    ],
    'inject css',
    '@import'
  )
})

gulp.task('inject-schemas', function() {
  return generateInject(
    path.join(folders.schemas, 'index.js'),
    folders.schemas,
    [
      folders.schemas + '/**/*.js',
      '!' + folders.schemas + '/**/index.js',
      '!' + folders.schemas + '/**/mongoose.js',
    ],
    'inject schemas',
    'require',
    true
  )
})

gulp.task('default', function(done) {
  runSequence('inject-css', 'inject-component-js', 'inject-shared-component-js', 'inject-vue', 'inject-views', 'inject-schemas', 'inject-admin-css', 'inject-admin-component-js', 'inject-admin-vue', done)
})










// var gulp = require('gulp')
// var path = require('path')
// var fs = require('fs')
// var async = require('async')
// var exec = require('child_process').exec
//
// var folders = {
//   gulp: path.resolve(__dirname, 'gulp'),
//   build: {
//     app: path.resolve(__dirname, 'public', 'app'),
//     admin: path.resolve(__dirname, 'public', 'admin'),
//     themes: path.resolve(__dirname, 'public', 'themes'),
//     gulp: path.resolve(__dirname, 'gulp', 'build'),
//     extensions: path.resolve(__dirname, 'public', 'extensions'),
//   },
//   admin: {
//     client: path.resolve(__dirname, 'public'),
//     root: path.resolve(__dirname, 'public', 'admin'),
//     code: path.resolve(__dirname, 'public', 'admin', 'code'),
//     shared: path.resolve(__dirname, 'public', 'shared'),
//     gulp: path.resolve(__dirname, 'gulp', 'admin'),
//     bower: path.resolve(__dirname, 'public', 'admin', 'bower_components')
//   },
//   app: {
//     client: path.resolve(__dirname, 'public'),
//     gulp: path.resolve(__dirname, 'gulp', 'app'),
//     root: path.resolve(__dirname, 'public', 'app'),
//     components: path.resolve(__dirname, 'public', 'app', 'components'),
//     shared: path.resolve(__dirname, 'public', 'shared'),
//     bower: path.resolve(__dirname, 'public', 'app', 'bower_components')
//   },
//   themes: {
//     root: path.resolve(__dirname, 'public', 'themes'),
//     gulp: path.resolve(__dirname, 'gulp', 'themes')
//   },
//   extensions: {
//     root: path.resolve(__dirname, 'public', 'extensions'),
//     gulp: path.resolve(__dirname, 'gulp', 'extensions')
//   },
// }
//
// /**
//  * We add all our gulp modules to the plugins object so we don't have to import their scripts in every file
//  */
// var plugins = require('gulp-load-plugins')({
//     pattern: ['gulp-*', 'gulp.*', 'del', 'run-sequence', 'merge-stream', 'main-bower-files', 'event-stream', 'browser-sync', 'debug'],
//     rename: {
//       'event-stream': 'es'
//     },
//     config: path.resolve(__dirname, 'package.json'),
//     lazy: false
// })
//
// var themes = fs.readdirSync(folders.themes.root).filter(function(file) {
//  return fs.statSync(path.join(folders.themes.root, file)).isDirectory()
// })
//
// var extensions = fs.readdirSync(folders.extensions.root).filter(function(file) {
//  return fs.statSync(path.join(folders.extensions.root, file)).isDirectory()
// })
//
// folders.themes.themes = themes
// folders.extensions.extensions = extensions
//
// var config = {
//   path: path,
//   async: async
// }
//
// /**
//  * Collect all the applications in gulp folder
//  */
// var otherTasks = fs.readdirSync(folders.gulp).filter(function(file) {
//   if(file[0] === '.' || file[0] === '_') {
//     return;
//   }
//  return fs.statSync(path.join(folders.gulp, file)).isFile()
// })
//
// otherTasks.forEach(function (file) {
// 	require( path.join(folders.gulp, file))(gulp, plugins, folders, config)
// })
//
// var adminTasks = fs.readdirSync(folders.admin.gulp).filter(function(file) {
//  return fs.statSync(path.join(folders.admin.gulp, file)).isFile()
// })
//
// adminTasks.forEach(function (file) {
// 	require( path.join(folders.admin.gulp, file))(gulp, plugins, folders.admin, config)
// })
//
// var appTasks = fs.readdirSync(folders.app.gulp).filter(function(file) {
//  return fs.statSync(path.join(folders.app.gulp, file)).isFile()
// })
//
// appTasks.forEach(function (file) {
// 	require( path.join(folders.app.gulp, file))(gulp, plugins, folders.app, config)
// })
//
// var themeTasks = fs.readdirSync(folders.themes.gulp).filter(function(file) {
//  return fs.statSync(path.join(folders.themes.gulp, file)).isFile()
// })
//
// themeTasks.forEach(function (file) {
// 	require( path.join(folders.themes.gulp, file))(gulp, plugins, folders.themes, config)
// })
//
// var extensionTasks = fs.readdirSync(folders.extensions.gulp).filter(function(file) {
//  return fs.statSync(path.join(folders.extensions.gulp, file)).isFile()
// })
//
// extensionTasks.forEach(function (file) {
// 	require( path.join(folders.extensions.gulp, file))(gulp, plugins, folders.extensions, config)
// })
//
// var buildTasks = fs.readdirSync(folders.build.gulp).filter(function(file) {
//  return fs.statSync(path.join(folders.build.gulp, file)).isFile()
// })
//
// buildTasks.forEach(function (file) {
// 	require( path.join(folders.build.gulp, file))(gulp, plugins, folders.build, config)
// })
//
//  /**
//  * Require each file in the gulp folder and pass in gulp, the plugins, and any configuration
//  */
//
// gulp.task('admin', function(done) {
//   plugins.runSequence('copy-fonts-admin', 'create-bower-admin', 'import-admin', done)
// })
//
// gulp.task('app', function(done) {
//   plugins.runSequence('copy-fonts-app', 'create-bower-app', 'import-app', done)
// })
//
// gulp.task('themes', function(done) {
//   plugins.runSequence('import-themes', done)
// })
//
// gulp.task('extensions', function(done) {
//   plugins.runSequence('import-extensions', done)
// })
//
// gulp.task('default', function(done) {
//   plugins.runSequence('admin', 'app', 'themes', 'extensions', done)
// });
//
// gulp.task('build', function(done) {
//   plugins.runSequence('dist', done)
// });
//
// gulp.task('empty-database', function(cb) {
//   exec('mongo --eval "show dbs; use meanbase-dev; db.dropDatabase()"', function (err, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     cb(err);
//   });
// });
