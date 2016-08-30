module.exports = function(gulp, plugins, folders, config) {

  gulp.task('import-themes', function(done) {
    plugins.runSequence('import-themes-jade', 'import-themes-js', 'import-themes-stylus', done)
  })

  gulp.task('import-themes-jade', function(done) {
    config.async.eachSeries(folders.themes, function iteratee(theme, callback) {
      gulp.src(config.path.join(folders.root, theme, 'index.js'))
        .pipe(plugins.inject(gulp.src([
          config.path.join(folders.root, theme, '/**/*.jade'),
          config.path.join(folders.root, theme, '/**/*.html'),
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
        .pipe(gulp.dest(config.path.join(folders.root, theme)))
				.on('error', callback)
				.on('end', callback);
		 }, done, done);
  })



  gulp.task('import-themes-js', function(done) {
    config.async.eachSeries(folders.themes, function iteratee(theme, callback) {
      var test = config.path.join(folders.root, theme, 'index.js');

      var sources = gulp.src([
        config.path.join(folders.root, theme, '/**/*.js'),
        '!**/index.js',
        '!**/theme.min.js',
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
            "angularjs-annotate",
            "ng-annotate"
          ]
        }))
        .pipe(plugins.angularFilesort())

      gulp.src(config.path.join(folders.root, theme, 'index.js'))
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
    	 .pipe(gulp.dest(config.path.join(folders.root, theme)))
       .on('error', callback)
       .on('end', callback);
    }, done, done);
  })

  gulp.task('import-themes-stylus', function(done) {
    config.async.eachSeries(folders.themes, function iteratee(theme, callback) {
      gulp.src(config.path.join(folders.root, theme, 'index.js'))
    	 .pipe(plugins.inject(gulp.src([
        config.path.join(folders.root, theme, '/**/*.styl'),
        config.path.join(folders.root, theme, '/**/*.css'),
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
  	 .pipe(gulp.dest(config.path.join(folders.root, theme)))
     .on('error', callback)
     .on('end', callback);
    }, done, done);
  })

}
