
module.exports = function(gulp, plugins, folders, config) {
  gulp.task('copy-fonts-admin', function() {
    return plugins.mergeStream(
      gulp.src(folders.bower + '/font-awesome/fonts/**')
        .pipe(plugins.chmod(755))
        .pipe(gulp.dest(folders.root + '/fonts/'))
    )
  })

  gulp.task('create-bower-admin', function() {
    var js = gulp.src(plugins.mainBowerFiles('**/*.js', {
      paths: {
        bowerDirectory: folders.root + '/bower_components',
        bowerJson: folders.root + '/bower.json'
      }
    }))

    var css = gulp.src(plugins.mainBowerFiles('**/*.css', {
      paths: {
        bowerDirectory: folders.root + '/bower_components',
        bowerJson: folders.root + '/bower.json'
      }
    }))
      .pipe(plugins.cssToJs())

    return plugins.es.merge(css, js)
      .pipe(plugins.concat('bower.js'))
      .pipe(gulp.dest(folders.root))
  })
}
