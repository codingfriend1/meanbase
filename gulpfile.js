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
		series = require('stream-series');


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

// 
gulp.task('serve', function() {
	// When there is a change in the stylus files recompile app.css
	gulp.watch(['client/**/*.styl'], {read: false}, ['injectStylus', 'compileAppCSS']);

	// When there is a change in jade files recompile html in .tmp
	gulp.watch(['client/**/*.jade'], {read: false}, ['jade']);

	// Inject scripts and styles into server/views/index.html when there are changes
	gulp.watch('bower.json', {read: false}, ['injectBowerComponents']);
	gulp.watch(['client/{app,components}/**/*.js', '!**/*spec.js', '!**/*mock.js'], {read: false}, ['injectComponents']);

	gulp.watch([
		'.tmp/**/*.html',
		'client/{app, components, extensions, themes}/**/*.js',
		'client/{app, components, extensions, themes}/**/*.css',
		'client/themes/**/*.html',
		'server/views/index.html',
		'.tmp/**/*app.css',
		'server/**'
	], server.notify);

	server.run(['server/app.js'], {livereload: true});
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
	return del('build/**');
});

gulp.task('copy', function () {
	return merge(
		gulp.src(['client/{themes,extensions}/**', 'client/*', 'client/assets/**'])
			.pipe(gulpif('*.jade', gulpJade({
	      jade: jade,
	      pretty: true
	    })))
	  	.pipe(gulp.dest('build/public/')),

	  gulp.src(['server/**'])
	  	.pipe(gulp.dest('build/server/')),

	  gulp.src('package.json')
	  	.pipe(gulp.dest('build/'))
	 );
});

gulp.task('build', function(done) {
	runSequence('clean', 'copy', function() {
		var vendorJS = gulp.src(mainBowerFiles('**/*.js'))
      .pipe(concat('vendors.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/public/app/'));

		var vendorCSS = gulp.src(mainBowerFiles('**/*.css'))
      .pipe(concat('vendors.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('build/public/app/'));

    var appJS = gulp.src(['client/{app,components}/**/*.js', '!**/*spec.js', '!**/*mock.js'])
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/public/app/'));

    var appCSS = gulp.src('client/app/app.styl')
      .pipe(stylus())
      .pipe(concat('app.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('build/public/app/'));
    gulp.src('client/index.html')
      .pipe(inject(es.merge(vendorJS, vendorCSS, appJS, appCSS)))
      .pipe(gulp.dest('build/public'));
    done();
  });
});

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

// Unit Tests
gulp.task('test', ['karma'], function (done) {
	// var appFiles = gulp.src([
	// 	'client/bower_components/angular-mocks/angular-mocks.js',
	// 	'client/app/app.js',
	// 	'client/app/**/*.(js|jade|html)',
	// 	'client/components/**/*.(js|jade|html)',
	// 	'client/{components, app, themes, extensions}/**/*spec.js',
	// 	'!**ngCropper.all.js'
	// ]).pipe(angularFilesort())
	var bowerFiles = gulp.src(mainBowerFiles('**/*.js'), {read: false});

	karma.start({
  	configFile: __dirname + '/karma.conf.js'
  }, done);
  ['client/**/*spec.js', 'client/**/*mock.js']
});