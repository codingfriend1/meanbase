module.exports = function(grunt) {

  grunt.config('karma', {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
  });


  grunt.config('mochaTest', {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
  });

  
  grunt.config('protractor', {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
  });

};