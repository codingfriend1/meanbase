
module.exports = function(gulp, plugins, folders, config) {
  gulp.task('copy-fonts-app', function() {
    return plugins.mergeStream(
      gulp.src(folders.bower + '/font-awesome/fonts/**')
        .pipe(plugins.chmod(755))
        .pipe(gulp.dest(folders.root + '/fonts/'))
    )
  })

  gulp.task('create-bower-app', function() {
    var js = gulp.src(plugins.mainBowerFiles('**/*.js', {
      paths: {
        bowerDirectory: folders.root + '/bower_components',
        bowerJson: folders.root + '/bower.json'
      }
    }))
      .pipe(plugins.debug('js'))

    var css = gulp.src(plugins.mainBowerFiles('**/*.css', {
      paths: {
        bowerDirectory: folders.root + '/bower_components',
        bowerJson: folders.root + '/bower.json'
      }
    }))
      .pipe(plugins.debug('css'))
      .pipe(plugins.cssToJs())

    return plugins.es.merge(css, js)
      .pipe(plugins.concat('bower.js'))
      // .pipe(plugins.uglify())
      .pipe(gulp.dest(folders.root))
  })
}
