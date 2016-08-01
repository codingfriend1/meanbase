module.exports = function(gulp, plugins, folders, config) {

  gulp.task('import-extensions', function(done) {
    plugins.runSequence('import-extensions-jade', 'import-extensions-js', 'import-extensions-stylus', done)
  })

  gulp.task('import-extensions-jade', function(done) {
    config.async.eachSeries(folders.extensions, function iteratee(extension, callback) {
      gulp.src(config.path.join(folders.root, extension, 'index.js'))
        .pipe(plugins.inject(gulp.src([
          config.path.join(folders.root, extension, '/**/*.jade'),
          config.path.join(folders.root, extension, '/**/*.html'),
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
        .pipe(gulp.dest(config.path.join(folders.root, extension)))
				.on('error', callback)
				.on('end', callback);
		 }, done, done);
  })



  gulp.task('import-extensions-js', function(done) {
    config.async.eachSeries(folders.extensions, function iteratee(extension, callback) {
      var test = config.path.join(folders.root, extension, 'index.js');
      gulp.src(config.path.join(folders.root, extension, 'index.js'))
    	 .pipe(plugins.inject(gulp.src([
        config.path.join(folders.root, extension, '/**/*.js'),
        '!**/index.js',
        '!**/extension.min.js',
        '!**/*spec.js',
        '!**/*mock.js',
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
    	 .pipe(gulp.dest(config.path.join(folders.root, extension)))
       .on('error', callback)
       .on('end', callback);
    }, done, done);
  })

  gulp.task('import-extensions-stylus', function(done) {
    config.async.eachSeries(folders.extensions, function iteratee(extension, callback) {
      gulp.src(config.path.join(folders.root, extension, 'index.js'))
    	 .pipe(plugins.inject(gulp.src([
        config.path.join(folders.root, extension, '/**/*.styl'),
        config.path.join(folders.root, extension, '/**/*.css'),
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
  	 .pipe(gulp.dest(config.path.join(folders.root, extension)))
     .on('error', callback)
     .on('end', callback);
    }, done, done);
  })

}
