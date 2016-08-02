module.exports = function(gulp, plugins, folders, config) {


  gulp.task('build-themes', function(done) {



    config.async.eachSeries(folders.themes, function iteratee(theme, callback) {
      var jadeFilter = plugins.filter('**/*.jade', {restore: true});
      
      gulp.src([
        config.path.join(folders.root, theme, '/**/*.jade'),
        config.path.join(folders.root, theme, '/**/*.html')

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
		    		var finalUrl = config.path.join('themes', theme, '/', url);
		    		return finalUrl;
		    	}
		    }))
        .pipe(plugins.concat('templates.js'))
        .pipe(gulp.dest(config.path.join(folders.root, theme)))
        .on('error', callback)
        .on('end', callback);
    }, done, done);
  })
};
