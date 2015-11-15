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
		fs = require('fs'),
		inject = require('gulp-inject'),
		del = require('del'),
		runSequence = require('run-sequence'),
		jade = require('jade'),
		gulpJade = require('gulp-jade'),
		path = require('path'),
		ngAnnotate = require('gulp-ng-annotate'),
		ngtemplate = require('gulp-ngtemplate'),
		htmlmin = require('gulp-htmlmin'),
		debug = require('gulp-debug');

var config = {
	themesFolder: 'client/themes/'
};

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

// Build automation
gulp.task('clean', function () {  
	return del('dist/**');
});

// Inject app and vendors scripts and styles into dist/server/views/index.html
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

gulp.task('copy', function () {
	return merge(
		gulp.src(['client/{themes,extensions}/**', 'client/*'])
			.pipe(gulpif('*.jade', gulpJade({
	      jade: jade,
	      pretty: true
	    })))
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

// Compile jade files to public folder
// gulp.task('templates-dist', function() {
// 	return gulp.src('client/{app,components,themes,extensions}/**/*.jade')
//     .pipe(gulpJade({
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
	var folders = getFolders(config.themesFolder);
	return folders.map(function(folder) {
		// Compile theme templates
  	var js = gulp.src([
  		path.join(config.themesFolder, folder, '/**/*.js'),
  		'!**/*spec.js'
  	])
    	.pipe(ngAnnotate());

   	// Compile app templates
  	var templates = gulp.src(path.join(config.themesFolder, folder, '/**/*.jade'))
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

	  var html = gulp.src([
	  	path.join(config.themesFolder, folder, '/**/*.html'),
	  	'!**/*scripts.html',
	  	'!**/*styles.html'
	  ])
	  	.pipe(ngtemplate({module: 'meanbaseApp'}));
  	
  	// Compile app.min.js from theme scripts and html templates
		es.merge(js, templates, html)
    	.pipe(concat('theme.min.js'))
    	.pipe(uglify())
    	.pipe(gulp.dest(path.join('dist/public/themes', folder)))
    	.pipe(es.wait(function (err, body) {
    		gulp.src( path.join(config.themesFolder, folder, '**', 'scripts.html') )
    			.pipe(inject(gulp.src(path.join('dist/public/themes/', folder, '**', 'theme.min.js'), {read: false}), {
    				name: 'theme',
    				ignorePath: 'dist/public',
    				addRootSlash: false
    			}))
    			.pipe(gulp.dest( path.join('dist/public/themes/', folder) ))
				gulp.src( path.join(config.themesFolder, folder, '**', 'styles.html') )
					.pipe(inject(gulp.src(path.join('dist/public/themes/', folder, '**', 'theme.min.css'), {read: false}), {
						name: 'theme',
						ignorePath: 'dist/public',
						addRootSlash: false
					}))
					.pipe(gulp.dest( path.join('dist/public/themes/', folder) ));
	    }))


    var stylusFiles = gulp.src(path.join(config.themesFolder, folder, '/**/*.styl'))
      .pipe(stylus());
    var css = gulp.src(path.join(config.themesFolder, folder, '/**/*.css'))

    es.merge(stylusFiles, css)
  		.pipe(concat('theme.min.css'))
  		.pipe(minifyCss())
  		.pipe(gulp.dest(path.join('dist/public/themes/', folder)));
  });
});

gulp.task('build', function(done) {
	return runSequence('clean', 'copy', function() {
		// Compile vendor.min.js from bootstrap dependencies
		var vendorJS = gulp.src(mainBowerFiles('**/*.js'))
      .pipe(concat('vendors.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/public/app/'));

    // Compile vendor.min.css from bootstrap dependencies
    var vendorCSS = gulp.src(mainBowerFiles('**/*.css'))
      .pipe(concat('vendors.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/public/app/'));

    // Compile app.min.css from client/app/app.styl
    var appCSS = gulp.src('client/app/app.styl')
      .pipe(stylus())
      .pipe(concat('app.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/public/app/'));

      // Annotate app scripts
    	var js = gulp.src([
    		'client/{app,components}/**/*.js', 
    		'!**/*spec.js', 
    		'!**/*mock.js',
    		'!client/components/ckeditor/FileBrowser/fileBrowser.js'
    	])
      	.pipe(ngAnnotate());

     	// Compile app templates
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
    	
    	// Compile app.min.js from theme scripts and html templates
  		var appJS = es.merge(js, templates)
  			.pipe(uglify())
      	.pipe(concat('app.min.js'))
      	.pipe(gulp.dest('dist/public/app/'));

	    es.merge(vendorCSS, vendorJS, appCSS, appJS).pipe(es.wait(function (err, body) {
	      gulp.run(['injectBuild', 'build-themes']);
	      done();
	    }))
  });
});