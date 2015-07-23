module.exports = function(grunt) {
    // Compiles Jade to html
  	grunt.config('jade', {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>',
          src: [
            '{app,components,themes,extensions}/**/*.jade'
          ],
          dest: '.tmp',
          ext: '.html'
        }]
      }
   });


};