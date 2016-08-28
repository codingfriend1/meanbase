module.exports = function(gulp, plugins, folders, config) {

  gulp.task('import-app', function(done) {
    plugins.runSequence('import-app-jade', 'import-app-js', 'import-app-stylus', done)
  })

  gulp.task('import-app-jade', function() {
    return gulp.src(config.path.join(folders.root, 'index.js'))
      .pipe(plugins.inject(gulp.src([
        folders.components + '/**/*.jade',
        folders.shared + '/**/*.jade'
      ], {
        read: true
      }), {
        relative: true,
        starttag: '// inject jade',
        endtag: '// end inject jade',
        // ignorePath: 'client',
        addRootSlash: false,
        transform: function(filepath, file, i, length) {
          if (filepath.indexOf('..') !== -1) {
            return 'import "' + filepath + '";'
          } else {
            return 'import "./' + filepath + '";'
          }
        }
      }))
      .pipe(gulp.dest(folders.root))
  })



  gulp.task('import-app-js', function() {

      var sources = gulp.src([
        folders.components + '/**/*.js',
        folders.shared + '/**/*.js',
        folders.root + '/app.js',
        '!**/*spec.js',
        '!**/*mock.js',
      ], {read: true})
        .pipe(plugins.babel({
          presets: ['es2017', 'es2015', 'stage-3'],
          "plugins": [
            'transform-runtime',
            'transform-async-to-generator',
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-flow-strip-types",
            "transform-object-rest-spread",
            "syntax-async-functions",
            "ng-annotate"
          ]
        }))
        .pipe(plugins.angularFilesort());

      return gulp.src(config.path.join(folders.root, 'index.js'))
        .pipe(plugins.inject(sources, {
          relative: true,
          starttag: '// inject js',
          endtag: '// end inject js',
          // ignorePath: 'client',
          addRootSlash: false,
          transform: function(filepath, file, i, length) {
            if (filepath.indexOf('..') !== -1) {
              return 'import "' + filepath + '";'
            } else {
              return 'import "./' + filepath + '";'
            }
          }
        }))
        .pipe(gulp.dest(folders.root))
  })

gulp.task('import-app-stylus', function() {
  return gulp.src(config.path.join(folders.root, 'index.js'))
    .pipe(plugins.inject(gulp.src([
      folders.root + '/app.styl',
      folders.components + '/**/*.styl',
      // folders.code + '/**/*.css',
      folders.shared + '/**/*.styl',
      // folders.shared + '/**/*.css',
    ], {
      read: false
    }), {
      relative: true,
      starttag: '// inject stylus',
      endtag: '// end inject stylus',
      transform: function(filepath, file, i, length) {
        if (filepath.indexOf('..') !== -1) {
          return 'import "' + filepath + '";'
        } else {
          return 'import "./' + filepath + '";'
        }
      }
    }))
    .pipe(gulp.dest(folders.root))
})

}
