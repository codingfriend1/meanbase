module.exports = function(gulp, plugins, folders, config) {

  gulp.task('import-admin', function(done) {
    plugins.runSequence('import-admin-jade', 'import-admin-js', 'import-admin-stylus', done)
  })

  gulp.task('import-admin-jade', function() {
    return gulp.src(config.path.join(folders.root, 'index.js'))
  	 .pipe(plugins.inject(gulp.src([
       folders.code + '/**/*.jade',
       folders.shared + '/**/*.jade'
     ], { read: true }), {
  		relative: true,
  		starttag: '// inject jade',
  		endtag: '// end inject jade',
      // ignorePath: 'client',
      addRootSlash: false,
  		transform: function(filepath, file, i, length) {
        if(filepath.indexOf('..') !== -1) {
          return 'import "' + filepath + '";'
        } else {
    		  return 'import "./' + filepath + '";'
        }
  		}
  	 }))
  	 .pipe(gulp.dest(folders.root))
  })



  gulp.task('import-admin-js', function() {

    var sources = gulp.src([
      folders.code + '/**/*.js',
      folders.shared + '/**/*.js',
      '!**/*spec.js',
      '!**/*mock.js'
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
          "angularjs-annotate",
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
          if(filepath.indexOf('..') !== -1) {
            return 'import "' + filepath + '";'
          } else {
      		  return 'import "./' + filepath + '";'
          }
    		}
  	 }))
  	 .pipe(gulp.dest(folders.root))
  })

  gulp.task('import-admin-stylus', function() {
    return gulp.src(config.path.join(folders.root, 'index.js'))
  	 .pipe(plugins.inject(gulp.src([
      folders.code + '/**/*.styl',
      // folders.code + '/**/*.css',
      folders.shared + '/**/*.styl',
      // folders.shared + '/**/*.css',
  	 ], { read: false }), {
  		relative: true,
  		starttag: '// inject stylus',
  		endtag: '// end inject stylus',
  		transform: function(filepath, file, i, length) {
        if(filepath.indexOf('..') !== -1) {
          return 'import "' + filepath + '";'
        } else {
    		  return 'import "./' + filepath + '";'
        }
  		}
  	 }))
  	 .pipe(gulp.dest(folders.root))
  })

}
