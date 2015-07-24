// This file should minimize all images


module.exports = function(grunt) {

// The following *-min tasks produce minified files in the dist folder
  	grunt.config('imagemin', {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }]
      }
   });

// For SVG's
  	grunt.config('svgmin', {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }]
      }

   });


};