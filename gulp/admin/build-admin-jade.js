const path = require('path');

module.exports = function(gulp, plugins, folders, config) {

  gulp.task('build-admin-jade', function() {
    var jadeFilter = plugins.filter('**/*.jade', {restore: true});
    return gulp.src([
      config.path.join(folders.shared, '/**/*.jade'),
      config.path.join(folders.shared, '/**/*.html'),
      config.path.join(folders.code, '/**/*.html'),
      config.path.join(folders.code, '/**/*.jade')
    ])
      .pipe(jadeFilter)
      .pipe(plugins.jade({
        pretty: false
      }))
      .pipe(plugins.htmlmin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }))
      .pipe(jadeFilter.restore)
      .pipe(plugins.angularTemplatecache({
        base: folders.client,
        module: 'meanbaseApp',
        transformUrl: function(url) {
          return url;
        }
      }))
      .pipe(plugins.concat('templates.js'))
      .pipe(gulp.dest(config.path.join(folders.root)))
  });
};
