module.exports = function(grunt) {

// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
	grunt.config('useminPrepare', {
      html: ['server/views/index.html'],
      options: {
        dest: '<%= yeoman.dist %>/public'
      }
   });


// Performs rewrites based on rev and the useminPrepare configuration
  	grunt.config('usemin', {
    	
    	html: ['<%= yeoman.dist %>/server/views/{,*/}*.html'],
    	css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
    	js: ['<%= yeoman.dist %>/public/{,*/}*.js'],
    	
    	options: {
	        assetsDirs: [
	        	'<%= yeoman.dist %>/public',
	        	'<%= yeoman.dist %>/public/assets/images'
	        ],
	        // This is so we update image references in our ng-templates
	        patterns: {
	          js: [
	            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
	          ]
	        }
      	}

   });


};