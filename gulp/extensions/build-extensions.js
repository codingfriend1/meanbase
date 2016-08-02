module.exports = function(gulp, plugins, folders, config) {


  gulp.task('build-extensions', function(done) {

    config.async.eachSeries(folders.extensions, function iteratee(extension, callback) {
      var jadeFilter = plugins.filter('**/*.jade', {restore: true});

      gulp.src([
        config.path.join(folders.root, extension, '/**/*.jade'),
        config.path.join(folders.root, extension, '/**/*.html')

      ])
        .pipe(jadeFilter)
		    .pipe(plugins.jade({
		      pretty: false
		    }))
		    .pipe(plugins.htmlmin({
		    	collapseBooleanAttributes: true,
		    	collapseWhitespace: true,
		    	removeAttributeQuotes: true,
		    	removeEmptyAttributes: true,
		    	removeRedundantAttributes: true,
		    	removeScriptTypeAttributes: true,
		    	removeStyleLinkTypeAttributes: true
		    }))
        .pipe(jadeFilter.restore)
		    .pipe(plugins.angularTemplatecache({
		    	module: 'meanbaseApp',
		    	transformUrl: function(url) {
		    		var finalUrl = config.path.join('extensions', extension, '/', url);
		    		return finalUrl;
		    	}
		    }))
        .pipe(plugins.concat('templates.js'))
        .pipe(gulp.dest(config.path.join(folders.root, extension)))
        .on('error', callback)
        .on('end', callback);
    }, done, done);
  })
};
