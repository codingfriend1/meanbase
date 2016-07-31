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
    return gulp.src(config.path.join(folders.root, 'index.js'))
  	 .pipe(plugins.inject(gulp.src([
       folders.code + '/**/*.js',
       folders.shared + '/**/*.js',
       '!**/*spec.js',
       '!**/*mock.js',
       '!' + config.path.join(folders.shared, '/ckeditor/FileBrowser/fileBrowser.js')
     ], { read: true }).pipe(plugins.angularFilesort()), {
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
