const path = require('path');

module.exports = function(gulp, plugins, folders, config) {

  gulp.task('build-app-jade', function(done) {
    var jadeFilter = plugins.filter('**/*.jade', {restore: true});
    return gulp.src([
      config.path.join(folders.shared, '/**/*.jade'),
      config.path.join(folders.shared, '/**/*.html'),

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
        module: 'meanbaseApp',
        base: folders.client,
        transformUrl: function(url) {
          url = config.path.join('shared', url)
          return url;
        }
      }))
      .pipe(plugins.concat('templates.js'))
      .pipe(gulp.dest(config.path.join(folders.root)))
  });
};
