
module.exports = function(gulp, plugins, folders, config) {

  gulp.task('dist', function(done) {
    plugins.runSequence('copy', done);
  });

  gulp.task('clean', function() {
    return plugins.del('dist/**');
  });

  gulp.task('copy', function() {
		return plugins.mergeStream(
			gulp.src([
        config.path.join(folders.admin, 'index.html'),
        config.path.join(folders.admin, 'bower.js'),
        config.path.join(folders.admin, 'bundle.js'),
        config.path.join(folders.admin, '*.png'),
        config.path.join(folders.admin, '*.jpg'),
      ])
			.pipe(plugins.chmod(755))
			.pipe(gulp.dest('dist/public/admin/')),


      gulp.src([
        config.path.join(folders.app, 'index.html'),
        config.path.join(folders.app, 'bower.js'),
        config.path.join(folders.app, 'bundle.js'),
        config.path.join(folders.app, '*.png'),
        config.path.join(folders.app, '*.jpg'),
        config.path.join(folders.app, 'robots.txt'),
        config.path.join(folders.app, 'favicon.ico')
      ])
  			.pipe(plugins.chmod(755))
  			.pipe(gulp.dest('dist/public/app/')),


      gulp.src([
        config.path.join(folders.app, 'fonts/**')
      ])
  			.pipe(plugins.chmod(755))
  			.pipe(gulp.dest('dist/public/app/fonts/')),

      gulp.src([
        config.path.join(folders.admin, 'fonts/**')
      ])
  			.pipe(plugins.chmod(755))
  			.pipe(gulp.dest('dist/public/admin/fonts/')),

			gulp.src([
        config.path.join(folders.themes, '**/theme.json'),
        config.path.join(folders.themes, '**/theme.min.js'),
        config.path.join(folders.themes, '**/*template.*'),
        config.path.join(folders.themes, '**/*screenshot.*')
      ])
				.pipe(plugins.chmod(755))
				.pipe(gulp.dest('dist/public/themes/')),

      gulp.src([
        config.path.join(folders.extensions, '**/extension.json'),
        config.path.join(folders.extensions, '**/index.html'),
        config.path.join(folders.extensions, '**/extension.min.js'),
        config.path.join(folders.extensions, '**/*screenshot.*')
      ])
				.pipe(plugins.chmod(755))
				.pipe(gulp.dest('dist/public/extensions/')),

		  gulp.src(['client/assets'])
				.pipe(plugins.chmod(755))
		  	.pipe(gulp.dest('dist/public')),

		  gulp.src(['server/**'])
				.pipe(plugins.chmod(755))
		  	.pipe(gulp.dest('dist/server/')),

		  gulp.src('package.json')
				.pipe(plugins.chmod(755))
		  	.pipe(gulp.dest('dist/'))

			// gulp.src('client/bower_components/trumbowyg/dist/ui/images/*.png')
			// 	.pipe(plugins.chmod(755))
		  // 	.pipe(gulp.dest('dist/public/bower_components/trumbowyg/dist/ui/images/'))
		 );
	});
};
