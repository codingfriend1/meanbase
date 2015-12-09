/**
 * @overview Builds the distribution folder
 * gulp build
 * 	Clears previous dist folder
 * 	Copies appropriate files and folders and font awesome and glyphicons
 * 	Generates vendor js and css in dist app folder. Compiles jade templates and js files into app.min.js
 * 	Injects those scripts and styles into dist/server/views/index.html
 * 	Creates theme.min.js and theme.min.css from (scripts, jade, html) and (stylus and css) from each theme
 * 	injects it into scripts.html and styles.html
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 */

module.exports = function (gulp, plugins, config) {
	// Build automation
	gulp.task('clean', function () {
		return plugins.del('dist/**');
	});

	// Inject app and vendors scripts and styles into dist/server/views/index.html
	gulp.task('injectBuild', function() {
		return gulp.src('dist/server/views/index.html')
		  .pipe(plugins.inject(gulp.src(['dist/public/app/app.min.*'], {read: false}), {
		  	name: 'app',
		  	ignorePath: '/dist/public/',
		  	addRootSlash: false
		  }))
		  .pipe(plugins.inject(gulp.src(['dist/public/app/vendors.min.*'], {read: false}), {
		  	name: 'vendor',
		  	ignorePath: '/dist/public/',
		  	addRootSlash: false
		  }))
		  .pipe(gulp.dest('dist/server/views'));
	});

	gulp.task('copy', function () {
		return plugins.mergeStream(
			gulp.src(['client/{extensions/**, themes/*}'])
				.pipe(plugins.if('*.jade', plugins.jade({
		      pretty: true
		    })))
				.pipe(gulp.dest('dist/public/')),

			gulp.src('client/themes/**/*screenshot.*')
				.pipe(gulp.dest('dist/public/themes/')),

		  gulp.src('client/*')
		  	.pipe(gulp.dest('dist/public/')),

		  gulp.src(['client/assets/**'])
		  	.pipe(gulp.dest('dist/public/assets/')),

		  gulp.src(['server/**'])
		  	.pipe(gulp.dest('dist/server/')),

		  gulp.src('package.json')
		  	.pipe(gulp.dest('dist/')),

		  gulp.src('client/bower_components/font-awesome/fonts/**')
		  	.pipe(gulp.dest('dist/public/bower_components/font-awesome/fonts/')),
		  gulp.src('client/bower_components/bootstrap/fonts/**')
		  	.pipe(gulp.dest('dist/public/bower_components/bootstrap/fonts/'))
		 );
	});

	gulp.task('injectComponents', function() {
		return gulp.src('server/views/index.html')
		  .pipe(
		  	plugins.inject(gulp.src(['client/{app,components}/**/*.js',
		  			'!**/*spec.js',
		  			'!**/*mock.js',
		  			'!client/components/ckeditor/FileBrowser/fileBrowser.js'
		  		]).pipe(plugins.angularFilesort()),
				  {
				  	name: 'app',
				  	ignorePath: 'client',
				  	addRootSlash: false
				  }
		  	))
		  .pipe(gulp.dest('server/views/'));
	});

	// Compile jade files to public folder
	// gulp.task('templates-dist', function() {
	// 	return gulp.src('client/{app,components,themes,extensions}/**/*.jade')
	//     .pipe(jade({
	//       jade: jade,
	//       pretty: false
	//     }))
	//     .pipe(htmlmin({
	//     	collapseBooleanAttributes: true,
	//     	collapseWhitespace: true,
	//     	removeAttributeQuotes: true,
	//     	removeEmptyAttributes: true,
	//     	removeRedundantAttributes: true,
	//     	removeScriptTypeAttributes: true,
	//     	removeStyleLinkTypeAttributes: true
	//     }));
	//     // .pipe(gulp.dest('dist/public/'));
	// });

	// Compile a theme into a theme.min.js and theme.min.css file
	gulp.task('build-themes', function(done) {
		var folders = config.getFolders(config.themesFolder);
		return folders.map(function(folder) {
			var themeJSONTemplatePaths = {};
			var templateMapping = {};
			var themePreview;
			var themeJSONPath;
			// Compile theme templates
	  	var js = gulp.src([
	  		plugins.path.join(config.themesFolder, folder, '/**/*.js'),
	  		'!**/*spec.js'
	  	])
	    	.pipe(plugins.ngAnnotate());

	   	// Compile app templates
	  	var templates = gulp.src(plugins.path.join(config.themesFolder, folder, '/**/*.jade'))
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
		    .pipe(plugins.angularTemplatecache({
		    	module: 'meanbaseApp',
		    	transformUrl: function(url) {
		    		var finalUrl = plugins.path.join('themes', folder, '/', url);
		    		var templateName = finalUrl.match(/[^(\/|\\)]*(?=-template.[^.]+($|\?))/);
		    		if(templateName) {
		    			templateName = templateName[0].replace(',', '');
		    			themeJSONTemplatePaths[templateName] = {
		    				"template": finalUrl
		    			};
		    			templateMapping[templateName] = [templateName];
		    		}
		    		return finalUrl;
		    	}
		    }));

		  var html = gulp.src([
		  	plugins.path.join(config.themesFolder, folder, '/**/*.html'),
		  	'!**/*scripts.html',
		  	'!**/*styles.html'
		  ])
		  	.pipe(plugins.angularTemplatecache({
		  		module: 'meanbaseApp',
		  		transformUrl: function(url) {
		  			var finalUrl = plugins.path.join('themes', folder, '/', url);
		  			var templateName = finalUrl.match(/[^(\/|\\)]*(?=-template.[^.]+($|\?))/)[0].replace(',', '');
		  			if(templateName) {
		  				themeJSONTemplatePaths[templateName] = {
		  					"template": finalUrl
		  				};
		  				templateMapping[templateName] = [templateName];
		  			}
		  			return finalUrl;
		  		}
		  	}));

	  	// Compile app.min.js from theme scripts and html templates
			plugins.es.merge(js, templates, html)
	    	.pipe(plugins.concat('theme.min.js'))
	    	.pipe(plugins.uglify())
	    	.pipe(gulp.dest(plugins.path.join('dist/public/themes', folder)))
	    	.pipe(plugins.es.wait(function (err, body) {
					gulp.src(plugins.path.join(config.themesFolder, folder, '/**/*screenshot.*'))
						.pipe(plugins.rename(function(url){
							var tmpUrl = plugins.path.join('themes', folder, url.dirname, url.basename + url.extname);
							if(url.basename === 'screenshot') {
								themePreview = tmpUrl;
							} else {
								var screenshotName = tmpUrl.match(/[^(\/|\\)]*(?=-screenshot.[^.]+($|\?))/);
								if(screenshotName) {
									screenshotName = screenshotName[0];
									if(themeJSONTemplatePaths[screenshotName]) {
										themeJSONTemplatePaths[screenshotName].screenshot = tmpUrl;
									}
								}
							}


					    return tmpUrl;
					  }))
					  .pipe(plugins.es.wait(function(err) {
					  	gulp.src( plugins.path.join('client/themes/', folder, '**/*theme.json') )
					  		.pipe(plugins.rename(function(url) {
					  			themeJSONPath = plugins.path.join('themes', folder, url.dirname, url.basename + url.extname)
					  			return themeJSONPath;
					  		}))
					  		.pipe(plugins.jsonEditor(function(json) {
									console.log("themeJSONTemplatePaths", themeJSONTemplatePaths);
					  		    json.templatePaths = themeJSONTemplatePaths;
					  		    json.templates = templateMapping;
					  		    json.preview = themePreview;
					  		    json.themeJSONPath = themeJSONPath;
					  		    return json; // must return JSON object.
					  		}))
					  		.pipe(gulp.dest(plugins.path.join("dist/public/themes/", folder, '/') ));
					  }));
		    }));


	    var stylusFiles = gulp.src(plugins.path.join(config.themesFolder, folder, '/**/*.styl'))
	      .pipe(plugins.stylus());
	    var css = gulp.src(plugins.path.join(config.themesFolder, folder, '/**/*.css'))

	    plugins.es.merge(stylusFiles, css)
	  		.pipe(plugins.concat('theme.min.css'))
	  		.pipe(plugins.autoprefixer())
	  		.pipe(plugins.minifyCss())
	  		.pipe(gulp.dest( plugins.path.join('dist/public/themes/', folder) ))
	  		.pipe(plugins.es.wait(function(err) {
			    plugins.del([
				  	plugins.path.join('dist/public/themes', folder, '/**/*.html'),
				  	plugins.path.join('dist/public/themes', folder, '/**/*.jade'),
				  	plugins.path.join('dist/public/themes', folder, '/**/*.+(html|js|css|styl|jade)'),
				  	'!**/*theme.min.js',
				  	'!**/*theme.min.css',
				  	'!**/*scripts.html',
				  	'!**/*styles.html'
				  ]);
	  		}));
	  });
	});

	gulp.task('build', function(done) {
		return plugins.runSequence('clean', 'copy', function() {
			// Compile vendor.min.js from bootstrap dependencies
			var vendorJS = gulp.src(plugins.mainBowerFiles('**/*.js'))
	      .pipe(plugins.concat('vendors.min.js'))
	      .pipe(plugins.uglify())
	      .pipe(gulp.dest('dist/public/app/'));

	    // Compile vendor.min.css from bootstrap dependencies
	    var vendorCSS = gulp.src(plugins.mainBowerFiles('**/*.css'))
	      .pipe(plugins.concat('vendors.min.css'))
	      .pipe(plugins.minifyCss())
	      .pipe(gulp.dest('dist/public/app/'));

	    // Compile app.min.css from client/app/app.styl
	    var appCSS = gulp.src('client/app/app.styl')
	      .pipe(plugins.stylus())
	      .pipe(plugins.autoprefixer())
	      .pipe(plugins.concat('app.min.css'))
	      .pipe(plugins.minifyCss())
	      .pipe(gulp.dest('dist/public/app/'));

	      // Annotate app scripts
	    	var js = gulp.src([
	    		'client/{app,components}/**/*.js',
	    		'!**/*spec.js',
	    		'!**/*mock.js',
	    		'!client/components/ckeditor/FileBrowser/fileBrowser.js'
	    	])
	      	.pipe(plugins.ngAnnotate());

	     	// Compile app templates
	    	var templates = gulp.src('client/{app,components}/**/*.jade')
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
			    .pipe(plugins.ngtemplate({module: 'meanbaseApp'}));

	    	// Compile app.min.js from theme scripts and html templates
	  		var appJS = plugins.es.merge(js, templates)
	  			.pipe(plugins.uglify())
	      	.pipe(plugins.concat('app.min.js'))
	      	.pipe(gulp.dest('dist/public/app/'));

		    plugins.es.merge(vendorCSS, vendorJS, appCSS, appJS).pipe(plugins.es.wait(function (err, body) {
					var vendorCSS, vendorJS, appCSS, appJS;
		      gulp.run(['injectBuild', 'build-themes']);
		      done();
		    }));
	  });
	});
};
