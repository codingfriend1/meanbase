module.exports = function(grunt) {
// Compiles Stylus to CSS
  	grunt.config('stylus', {
      cms: {
        options: {
          paths: [
            '<%= yeoman.client %>/bower_components',
            '<%= yeoman.client %>/app',
            '<%= yeoman.client %>/components'
          ],
          "include css": true
        },
        files: {
          '.tmp/app/app.css' : '<%= yeoman.client %>/app/app.styl'
        }
      }
   });


};