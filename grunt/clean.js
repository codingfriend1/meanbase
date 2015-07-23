module.exports = function(grunt) {

  	grunt.config('clean', {
    	dist: {
	        files: [{
	        	dot: true,
	        	src: [
		        	'.tmp',
		        	'<%= yeoman.dist %>/*',
		        	'!<%= yeoman.dist %>/.git*',
		        	'!<%= yeoman.dist %>/.openshift',
		        	'!<%= yeoman.dist %>/Procfile'
	          	]
	        }]
      	},
      server: '.tmp'
   });


};