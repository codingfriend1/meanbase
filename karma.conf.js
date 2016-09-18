module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    reporters: ['spec'],
    port: 9876,
    colors: true,
    // logLevel: config.LOG_INFO,
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    preprocessors: {
      // './public/app/index.js': ['webpack'],
      './tests/**/*.spec.js': ['babel'],
      './public/app/**/*spec.js': ['babel'],
    },

    files: [
      './public/app/index.html',
      './public/app/bower.js',
      './public/app/bundle.js',
      './public/app/**/*spec.js',
      './tests/**/*.js'
    ],
  });
}
