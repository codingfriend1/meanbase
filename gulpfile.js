var gulp = require('gulp'),
		merge = require('merge-stream'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		stylus = require('gulp-stylus'),
		gulpif = require('gulp-if'),
		minifyCss = require('gulp-minify-css'),
		mainBowerFiles = require('main-bower-files'),
		angularFilesort = require('gulp-angular-filesort'),
		es = require('event-stream'),
		inject = require('gulp-inject'),
		del = require('del'),
		runSequence = require('run-sequence'),
		run = require('gulp-run'),
		server = require('gulp-express'),
		jade = require('jade'),
		gulpJade = require('gulp-jade'),
		jasmine = require('gulp-jasmine'),
		karma = require('karma').server,
		series = require('stream-series'),
		fs = require('fs'),
		path = require('path'),
		ngAnnotate = require('gulp-ng-annotate'),
		ngtemplate = require('gulp-ngtemplate'),
		htmlmin = require('gulp-htmlmin');


// gulp.src(
          	// 	inject(
          	// 		gulp.src(['client/{app,components}/**/*.js', 
          	// 			'!**/*spec.js', 
          	// 			'!**/*mock.js',
          	// 			'!client/components/ckeditor/FileBrowser/fileBrowser.js'
          	// 		])
          	// 		// .pipe(angularFilesort()) 
          	// 	)
          	// )

var config = {
	themesFolder: 'client/themes/'
};

gulp.task('default', function() {
	
});



// Serve
gulp.task('clean:tmp', function () {  
	return del('.tmp/**');
});

// Compile jade files to .tmp folder
gulp.task('jade', function() {
	return gulp.src('client/{app,components,themes,extensions}/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: false
    }))
    .pipe(gulp.dest('.tmp/'));
});

// Compile app.styl to .tmp/app/
gulp.task('compileAppCSS', function() {
	return gulp.src('client/app/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('.tmp/app/'));
});

// Inject main bower files into server/views/index.html at vendor:js and vendor:css
gulp.task('injectBowerComponents', function() {
	return gulp.src('server/views/index.html')
	  .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {
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
	  	inject(gulp.src(['client/{app,components}/**/*.js', 
	  			'!**/*spec.js', 
	  			'!**/*mock.js',
	  			'!client/components/ckeditor/FileBrowser/fileBrowser.js'
	  		]).pipe(angularFilesort()),
			  {
			  	name: 'app',
			  	ignorePath: 'client',
			  	addRootSlash: false
			  }
	  	))
	  .pipe(gulp.dest('server/views/'));
});

gulp.task('injectBuild', function() {
	return gulp.src('dist/server/views/index.html')
	  .pipe(inject(gulp.src(['dist/public/app/app.min.*'], {read: false}), {
	  	name: 'app', 
	  	ignorePath: '/dist/public/',
	  	addRootSlash: false
	  }))
	  .pipe(inject(gulp.src(['dist/public/app/vendors.min.*'], {read: false}), {
	  	name: 'vendor', 
	  	ignorePath: '/dist/public/',
	  	addRootSlash: false
	  }))
	  .pipe(gulp.dest('dist/server/views'));
});

// @import stylus scripts into client/app/app.styl at "// inject stylus"
gulp.task('injectStylus', function() {
	return gulp.src('client/app/app.styl')
	  .pipe(inject(gulp.src([
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

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('compileThemeCSS', function() {
	var folders = getFolders(config.themesFolder);
	return folders.map(function(folder) {
    return gulp.src(path.join(config.themesFolder, folder, '/**/*.styl'))
      .pipe(stylus())
  		.pipe(concat('theme.css'))
  		.pipe(gulp.dest(path.join(config.themesFolder, folder, 'assets')));
   });
});

gulp.task('serve', function() {
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
		'client/themes/**/*.html',
		'server/views/index.html', 
		'.tmp/**/*app.css',
		'server/**'
	], {read: false}, server.notify);

	server.run(['server/app.js'], {livereload: true});
});


gulp.task('serve-dist', function() {
	server.run(['dist/server/app.js'], {
		livereload: true,
		env: {
			NODE_ENV: 'production'
		}
	});
});

// Setup
gulp.task('install', ['clean:tmp'], function() {
	run('npm install').exec('', function() {
		run('bower install').exec('', function() {
			runSequence('jade', 'injectStylus', 'compileAppCSS', 'injectBowerComponents', 'injectComponents');
		});
	});
});


// Build automation
gulp.task('clean', function () {  
	return del('dist/**');
});

gulp.task('copy', function () {
	return merge(
		gulp.src(['client/{themes,extensions}/**', 'client/*', 'client/assets/**'])
			.pipe(gulpif('*.jade', gulpJade({
	      jade: jade,
	      pretty: true
	    })))
	  	.pipe(gulp.dest('dist/public/')),

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
	  	inject(gulp.src(['client/{app,components}/**/*.js', 
	  			'!**/*spec.js', 
	  			'!**/*mock.js',
	  			'!client/components/ckeditor/FileBrowser/fileBrowser.js'
	  		]).pipe(angularFilesort()),
			  {
			  	name: 'app',
			  	ignorePath: 'client',
			  	addRootSlash: false
			  }
	  	))
	  .pipe(gulp.dest('server/views/'));
});

// Compile jade files to .tmp folder
gulp.task('templates-dist', function() {
	return gulp.src('client/{app,components,themes,extensions}/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: false
    }))
    .pipe(htmlmin({
    	collapseBooleanAttributes: true,
    	collapseWhitespace: true,
    	removeAttributeQuotes: true,
    	removeEmptyAttributes: true,
    	removeRedundantAttributes: true,
    	removeScriptTypeAttributes: true,
    	removeStyleLinkTypeAttributes: true
    }))
        .pipe(ngtemplate({module: function(name) { return 'mgcrea.ngStrap.' + name.split('/')[0]; }}))
    // .pipe(gulp.dest('dist/public/'));
});

gulp.task('build', function(done) {
	return runSequence('clean', 'copy', 'templates-dist', function() {
		var vendorJS = gulp.src(mainBowerFiles('**/*.js'))
      .pipe(concat('vendors.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/public/app/'));

    var vendorCSS = gulp.src(mainBowerFiles('**/*.css'))
      .pipe(concat('vendors.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/public/app/'));

    var appCSS = gulp.src('client/app/app.styl')
      .pipe(stylus())
      .pipe(concat('app.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/public/app/'));

    	var js = gulp.src([
    		'client/{app,components}/**/*.js', 
    		'!**/*spec.js', 
    		'!**/*mock.js',
    		'!client/components/ckeditor/FileBrowser/fileBrowser.js'
    	])
      	.pipe(ngAnnotate());

    	var templates = gulp.src('client/{app,components}/**/*.jade')
		    .pipe(gulpJade({
		      jade: jade,
		      pretty: false
		    }))
		    .pipe(htmlmin({
		    	collapseBooleanAttributes: true,
		    	collapseWhitespace: true,
		    	removeAttributeQuotes: true,
		    	removeEmptyAttributes: true,
		    	removeRedundantAttributes: true,
		    	removeScriptTypeAttributes: true,
		    	removeStyleLinkTypeAttributes: true
		    }))
		    .pipe(ngtemplate({module: 'meanbaseApp'}));
    		
  		var appJS = es.merge(js, templates)
  			.pipe(uglify())
      	.pipe(concat('app.min.js'))
      	.pipe(gulp.dest('dist/public/app/'));

	    es.merge(vendorCSS, vendorJS, appCSS, appJS).pipe(es.wait(function (err, body) {
	      runSequence('injectBuild');
	      done();
	    }))
  });
});

// Unit Tests
gulp.task('karma', function() {
	return gulp.src('karma.conf.js')
	  .pipe(inject(gulp.src(mainBowerFiles('**/*.js'), {read: false}), {
	    starttag: 'files: [',
	    endtag: "'client/bower_components/angular-mocks/angular-mocks.js'",
	    addRootSlash: false,
	    transform: function (filepath, file, i, length) {
	    	return '"' + filepath + '",';;
	    }
	  }))
	  .pipe(gulp.dest('./'));
});

gulp.task('test', ['karma'], function (done) {
	karma.start({
  	configFile: __dirname + '/karma.conf.js'
  }, done);
});