module.exports = function(grunt) {

  	grunt.config('express', {
		options: {
			port: process.env.PORT || 9000
		},
		dev: {
			options: {
		  		script: 'server/app.js',
		  		debug: true
			}
		},
		prod: {
			options: {
				script: 'dist/server/app.js'
			}
		}
   });


};