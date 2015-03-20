/**
 * Main index file for app
 */

'use strict';

var config = require('../../config/environment');
var fs = require('fs');

// Get's the scripts and styles from the chosen theme and inserts them into the index.html
// PARAMS theme: 'String'
function compileIndex(theme) {
	// Get file paths
	var viewFilePath = config.root + '/server/views/index.html',
		themeJSPath = config.root + '/client/themes/' + theme + '/assets/scripts.html',
		themeCSSPath = config.root + '/client/themes/' + theme + '/assets/styles.html';

	// Get file contents
	var themeJS = fs.readFileSync(themeJSPath,'utf8'),
		themeCSS = fs.readFileSync(themeCSSPath,'utf8'),
		index = fs.readFileSync(viewFilePath,'utf8');

		// Insert given theme's assets into index.html
		index = index.replace('<!-- Theme Styles -->', themeCSS);
		index = index.replace('<!-- Theme Scripts -->', themeJS);

	try {
		// Write the results back to index.html in client/ folder
		fs.writeFileSync(config.root + '/client/index.html', index, 'utf8');
	} catch(error) {
		console.log('error: ', error);
	}
}

compileIndex('meanbase-starter');