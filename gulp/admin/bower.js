
module.exports = function(gulp, plugins, folders, config) {
  gulp.task('copy-fonts', function() {
    return plugins.mergeStream(
      gulp.src(folders.bower + '/font-awesome/fonts/**')
        .pipe(plugins.chmod(755))
        .pipe(gulp.dest(folders.root + '/fonts/')),

      gulp.src(folders.bower + '/bootstrap/fonts/**')
        .pipe(plugins.chmod(755))
        .pipe(gulp.dest(folders.root + '/fonts/')),

      gulp.src(folders.bower + '/trumbowyg/dist/ui/images/icons.png')
        .pipe(plugins.chmod(755))
        .pipe(gulp.dest(folders.root + '/fonts/')),

      gulp.src([
        folders.bower + '/mdl-pack/icons/**',
        '!' + folders.bower + '/mdl-pack/icons/codepoints',
        '!' + folders.bower + '/mdl-pack/icons/material-icons.css',
        '!' + folders.bower + '/mdl-pack/icons/README.md'
      ])
        .pipe(plugins.chmod(755))
        .pipe(gulp.dest(folders.root + ''))
    )
  })

  gulp.task('create-bower.js', function() {
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
