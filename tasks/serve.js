// gulp serve
// gulp serve-dist
module.exports = function (gulp, plugins, config) {
	gulp.task('default', function() {

	});

	// Serve
	gulp.task('clean:tmp', function () {
		return plugins.del('.tmp/**');
	});

	// Compile jade files to .tmp folder
	gulp.task('jade', function() {
		return gulp.src('client/{app,components,themes,extensions}/**/*.jade')
	    .pipe(plugins.jade({
	      pretty: true
	    }))
	    .pipe(gulp.dest('.tmp/'));
	});

	// Compile app.styl to .tmp/app/
	gulp.task('compileAppCSS', function() {
		return gulp.src('client/app/app.styl')
	    .pipe(plugins.stylus())
	    .pipe(plugins.autoprefixer())
	    .pipe(gulp.dest('.tmp/app/'));
	});

	// Inject main bower files into server/views/index.html at vendor:js and vendor:css
	gulp.task('injectBowerComponents', function() {
		return gulp.src('server/views/index.html')
		  .pipe(plugins.inject(gulp.src(plugins.mainBowerFiles(), {read: false}), {
		  	name: 'vendor',
		  	ignorePath: 'client',
		  	addRootSlash: false
		  }))
		  .pipe(gulp.dest('server/views/'));
	});

	// Inject scripts into server/views/index.html at app:js
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

	// @import stylus scripts into client/app/app.styl at "// inject stylus"
	gulp.task('injectStylus', function() {
		return gulp.src('client/app/app.styl')
		  .pipe(plugins.inject(gulp.src([
		  	'client/{app,components}/**/*.styl',
		  	'!client/app/app.styl'
		  ], {read: false}), {
		  	relative: true,
	      starttag: '// inject stylus',
	      endtag: '// end inject stylus',
	      transform: function (filepath, file, i, length) {
	      	return "@import '" + filepath + "';";
	      }
	    }))
	    .pipe(gulp.dest('client/app/'));
	});

	gulp.task('compileThemeCSS', function() {
		var folders = getFolders(config.themesFolder);
		return folders.map(function(folder) {
	    return gulp.src(plugins.path.join(config.themesFolder, folder, '/**/*.styl'))
	      .pipe(plugins.stylus())
	  		.pipe(plugins.concat('theme.css'))
	  		.pipe(plugins.autoprefixer())
	  		.pipe(gulp.dest(plugins.path.join(config.themesFolder, folder, 'assets')));
	   });
	});

	gulp.task('serve', function() {
		plugins.express.run(['server/app.js'], {livereload: true});

		// app and components stylus files update app.css
		gulp.watch(['client/{app,components}/**/*.styl'], {read: false}, ['injectStylus', 'compileAppCSS']);

		// Themes stylus files update theme.css
		gulp.watch(['client/themes/**/*.styl'], {read: false}, ['compileThemeCSS']);

		// Jade files recompile html in .tmp
		gulp.watch(['client/**/*.jade'], {read: false}, ['jade']);

		// Inject scripts and styles into server/views/index.html when there are changes
		gulp.watch('bower.json', {read: false}, ['injectBowerComponents']);
		gulp.watch(['client/{app,components}/**/*.js', '!**/*spec.js', '!**/*mock.js'], {read: false}, ['injectComponents']);

		gulp.watch([
			'.tmp/**/*.html',
			'client/{app, components, extensions, themes}/**/*.{css, js, styl}',
			'client/themes/**/*.css',
			'client/themes/**/*.html',
			'server/views/index.html',
			'.tmp/**/*app.css',
			'server/**/*.{js, json}'
		], {read: false}, plugins.express.notify);
	});


	gulp.task('serve-dist', function() {
		plugins.express.run(['dist/server/app.js'], {
			livereload: true,
			env: {
				NODE_ENV: 'production'
			}
		});
	});
};
