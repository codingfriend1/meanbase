/**
 * @overview Handles unit tests
 * gulp test
 * 	Runs jasmine karma unit tests client side
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 */

var karma = require('karma').server;

module.exports = function (gulp, plugins, folders, config) {
	// Unit Tests
	// gulp.task('karma', function() {
  //
  //   var source = gulp.src(plugins.mainBowerFiles('**/*.js', {
  //     paths: {
  //       bowerDirectory: folders.app.root + '/bower_components',
  //       bowerJson: folders.app.root + '/bower.json'
  //     }
  //   }))
  //
	// 	return gulp.src('./karma.conf.js')
	// 	  .pipe(plugins.inject(source, {
	// 	    starttag: 'files: [',
	// 	    endtag: "'client/app/**/services/**/*.{js,css,html,jade}',",
	// 	    addRootSlash: false,
	// 	    transform: function (filepath, file, i, length) {
	// 	    	return '"' + filepath + '",';
	// 	    }
	// 	  }))
	// 	  .pipe(gulp.dest('./'));
	// });

	gulp.task('test', function (done) {
		karma.start({
	  	configFile: __dirname + '/../karma.conf.js'
	  }, done);
	});
};
