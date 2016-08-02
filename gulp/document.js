module.exports = function (gulp, plugins) {
  gulp.task('clear-docs', function () {  
  	return plugins.del('documentation/**');
  });

  gulp.task('document', ['clear-docs'], function(done) {
    // gulp.src([
    // 	'client/{app, components}/**/*.js',
    // 	'README.md',
    // 	'server/**.js'
    // ])
  	plugins.run("docker -i client/ --exclude bower_components,*spec.js,*.styl,*.jade,extensions,assets,themes,tasks,e2e,dist,.tmp,Gruntfile.js,gulpfile.js,karma.conf.js  -o documentation -u -n --ignore_hidden").exec('', done);
  });
};