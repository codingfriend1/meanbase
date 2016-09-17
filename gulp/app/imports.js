module.exports = function(gulp, plugins, folders, config) {

  gulp.task('import-app', function(done) {
    plugins.runSequence('import-app-jade', 'import-app-js', 'import-app-stylus', done)
  })

  gulp.task('import-app-jade', function() {
    return gulp.src(config.path.join(folders.root, 'index.js'))
      .pipe(plugins.inject(gulp.src([
        folders.components + '/**/*.jade',
      ], {
        read: true
      }), {
        relative: true,
        starttag: '// inject jade',
        endtag: '// end inject jade',
        addRootSlash: false,
        transform: function(filepath, file, i, length) {
          if (filepath.indexOf('..') !== -1) {
            return 'import "' + filepath + '"'
          } else {
            return 'import "./' + filepath + '"'
          }
        }
      }))
      .pipe(gulp.dest(folders.root))
  })



  gulp.task('import-app-js', function() {

      var sources = gulp.src([
        folders.root + '/**/*.js',
        '!**/bower_components/**',
        '!' + folders.root + '/**/globals.js',
        '!' + folders.root + '/**/api/**',
        '!' + folders.root + '/**/routing/**',
        '!' + folders.root + '/**/index.js',
        '!' + folders.root + '/**/app.controller.js',
        '!**/bundle.js',
        '!**/bower.js',
        '!**/*spec.js',
        '!**/*mock.js',
      ], {read: false})

      return gulp.src(config.path.join(folders.root, 'index.js'))
        .pipe(plugins.inject(sources, {
          relative: true,
          starttag: '// inject js',
          endtag: '// end inject js',
          // ignorePath: 'client',
          addRootSlash: false,
          transform: function(filepath, file, i, length) {
            if (filepath.indexOf('..') !== -1) {
              return 'import "' + filepath + '"'
            } else {
              return 'import "./' + filepath + '"'
            }
          }
        }))
        .pipe(gulp.dest(folders.root))
  })

gulp.task('import-app-stylus', function() {
  return gulp.src(config.path.join(folders.root, 'app.styl'))
    .pipe(plugins.inject(gulp.src([
      folders.root + '/**/*.styl',
      "!**/app.styl",
      "!**/bower_components/**"
    ], {
      read: false
    }), {
      relative: true,
      starttag: '// inject stylus',
      endtag: '// end inject stylus',
      transform: function(filepath, file, i, length) {
        if (filepath.indexOf('..') !== -1) {
          return '@import "' + filepath + '";'
        } else {
          return '@import "./' + filepath + '";'
        }
      }
    }))
    .pipe(gulp.dest(folders.root))
})

}
