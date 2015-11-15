/**
 * @overview Handles unit tests
 * gulp test
 * 	Runs jasmine karma unit tests client side
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 */

var gulp = require('gulp'),
		mainBowerFiles = require('main-bower-files'),
		inject = require('gulp-inject'),
		jasmine = require('gulp-jasmine'),
		karma = require('karma').server,
		debug = require('gulp-debug');

// Unit Tests
gulp.task('karma', function() {
	return gulp.src('../karma.conf.js')
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
  	configFile: __dirname + '/../karma.conf.js'
  }, done);
});