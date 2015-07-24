module.exports = function(grunt) {
// Run some tasks in parallel to speed up the build process
  	grunt.config('concurrent', {
      server: [
        'jade',
        'stylus:cms'
      ],
      test: [
        'jade',
        'stylus:cms'
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'jade',
        'stylus:cms',
        'imagemin',
        'svgmin'
      ]
   });


};