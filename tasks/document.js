var gulp = require('gulp'),
		run = require('gulp-run'),
		del = require('del');
 

gulp.task('clear-docs', function () {  
	return del('documentation/**');
});

gulp.task('document', ['clear-docs'], function(done) {
  // gulp.src([
  // 	'client/{app, components}/**/*.js',
  // 	'README.md',
  // 	'server/**.js'
  // ])
	run("docker -i client/ --exclude bower_components,*spec.js,*.styl,*.jade,extensions,assets,themes,tasks,e2e,dist,.tmp,Gruntfile.js,gulpfile.js,karma.conf.js  -o documentation -u -n --ignore_hidden").exec('', done);
});