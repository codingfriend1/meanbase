/**
 * @overview Handles unit tests
 * gulp test
 * 	Runs jasmine karma unit tests client side
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 */

var karma = require('karma').server;

module.exports = function (gulp, plugins, config) {
	// Unit Tests
	gulp.task('karma', function() {
		return gulp.src('../karma.conf.js')
		  .pipe(plugins.inject(gulp.src(plugins.mainBowerFiles('**/*.js'), {read: false}), {
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
};