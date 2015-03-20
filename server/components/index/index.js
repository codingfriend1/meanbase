/**
 * Compiles the client/index.html from a copy in server/views/index.html with the chosen theme assets
 * Grunt loads /app/ themes and scripts into server/views/index.html
 */

 var config = require('../../config/environment');
 var themesFolder = '/client/themes/';
 var fs = require('fs');

// Gets the scripts and styles from the chosen theme and inserts them into the index.html
// PARAMS theme: 'String'
module.exports = function(theme) {
 	'use strict';
	// Get file paths for the server/views/index and the chosen theme's scripts and styles templates
	var viewFilePath = config.root + '/server/views/index.html',
		themeJSPath = config.root + themesFolder + theme + '/assets/scripts.html',
		themeCSSPath = config.root + themesFolder + theme + '/assets/styles.html';

	// Try to read the file contents
	try {
		var themeJS = fs.readFileSync(themeJSPath,'utf8'),
			themeCSS = fs.readFileSync(themeCSSPath,'utf8'),
			index = fs.readFileSync(viewFilePath,'utf8');
	} catch(error) {
		// If meanbase had trouble finding the theme or some other difficulty just use the current index.html
		console.log('Error compiling the index.html with the chosen theme: ', error);
		return false;
	}

	// If the file reads were successful then insert given theme's assets into index.html
	index = index.replace('theme-name', theme);
	index = index.replace('<!-- Theme Styles -->', themeCSS);
	index = index.replace('<!-- Theme Scripts -->', themeJS);

	try {
		// Write the results back to index.html in client/ folder
		fs.writeFileSync(config.root + '/client/index.html', index, 'utf8');
	} catch(error) {
		console.log('error: ', error);
	}
}