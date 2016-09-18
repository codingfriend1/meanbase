
// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      "public/app/bower_components/json3/lib/json3.js",
      "public/app/bower_components/es5-shim/es5-shim.js",
      "public/app/bower_components/jquery/dist/jquery.js",
      "public/app/bower_components/angular/angular.js",
      "public/app/bower_components/modernizr/modernizr.js",
      "public/app/bower_components/validator-js/validator.js",
      "public/app/bower_components/lodash/lodash.js",
      "public/app/bower_components/handlebars/handlebars.runtime.min.js",
      "public/app/bower_components/medium-editor/dist/js/medium-editor.js",
      "public/app/bower_components/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.js",
      "public/app/bower_components/jquery-ui/jquery-ui.js",
      "public/app/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js",
      "public/app/bower_components/blueimp-file-upload/js/jquery.iframe-transport.js",
      "public/app/bower_components/blueimp-file-upload/js/jquery.fileupload.js",
      "public/app/bower_components/closest/closest.js",
      "public/app/bower_components/toastr/toastr.js",
      "public/app/bower_components/bootstrap/dist/js/bootstrap.min.js",
      "public/app/bower_components/Sortable/Sortable.js",
      "public/app/bower_components/dropdown/dist/dropdown.js",
      'public/app/**/services/**/*.{js,css,html,jade}',
      'public/app/**/filters/**/*.{js,css,html,jade}',
      'public/app/**/components/**/*.{js,css,html,jade}',
      'public/app/**/routing/**/*.{js,css,html,jade}',
      'public/app/**/app/**/*.{js,css,html,jade}',
      'public/app/**/globals.js',
      'public/app/**/*spec.js',
    ],

    preprocessors: {
      // '**/*.jade': 'ng-jade2js',
      'public/app/**/{routing, filters, services, components, app}/**/*.{js}': ['babel'],
      'test/**/*.js': ['babel'],
      '**/*.html': 'html2js'
    },

    babelPreprocessor: {
      options: {
        presets: ['es2017'],
        "plugins": ["transform-async-to-generator"],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    }

    // ngHtml2JsPreprocessor: {
    //   stripPrefix: 'client/'
    // },
    //
    // ngJade2JsPreprocessor: {
    //   stripPrefix: 'client/'
    // },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DISABLE,

    reporters: ['spec'],



    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
