'use strict';

/**
 * Compiles the client/index.html from a copy in server/views/index.html with the chosen theme assets
 * Grunt loads /app/ themes and scripts into server/views/index.html
 */

 var config = require('../../config/environment');
 var themesFolder = '/client/themes/';
 var fs = require('fs');
 var Themes = require('../../api/themes/themes.model');

module.exports = function(theme) {
	if(theme) {
		compileIndex(theme, GLOBAL.meanbaseGlobals.extensions);
	} else {
		Themes.find({active: true}, function(err, found) {
			if(err) { return handleError(res, err); }
			if(found < 1) { 
				getFirstTheme(function(found) {
					compileIndex(found, GLOBAL.meanbaseGlobals.extensions);
				}); 
			} else {
				compileIndex(found[0], GLOBAL.meanbaseGlobals.extensions);
			}
		});
	}
}

function getFirstTheme(callback) {
	Themes.find({}, function(err, found) {
		if(err) { return console.log('error finding themes', err); }
		if(found.length < 1) { return console.log('could not find any themes'); }
		if(callback) { callback(found[0]); }
		return found[0];
	});
}

// Gets the scripts and styles from the chosen theme and inserts them into the index.html
function compileIndex(theme, extensionJSONS) {
	// Get file paths for the server/views/index and the chosen theme's scripts and styles templates
	var viewFilePath = config.root + '/server/views/index.html',
		themeJSPath = config.root + themesFolder + theme.url + '/assets/scripts.html',
		themeCSSPath = config.root + themesFolder + theme.url + '/assets/styles.html';

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
	index = index.replace('theme-name', theme.url);
	index = index.replace("'theme-templates'", JSON.stringify(theme.templates));
	index = index.replace('<!-- Theme Styles -->', themeCSS);
	index = index.replace('<!-- Theme Scripts -->', themeJS);

	if(extensionJSONS) {
		for (var i = 0; i < extensionJSONS.length; i++) {
			for (var x = 0; x < extensionJSONS[i].urls.length; x++) {
				var cssPattern = new RegExp("\.(css)$");
				var jsPattern = new RegExp("\.(js)$");

				if(cssPattern.test(extensionJSONS[i].urls[x])) {
					index = index.replace('<!-- extensions:css -->', '<link rel="stylesheet" href="' + extensionJSONS[i].urls[x] + '">' + '\n\t\t\t\t\t <!-- extensions:css -->');
				} else if(jsPattern.test(extensionJSONS[i].urls[x])) {
					index = index.replace('<!-- extensions:js -->', '<script src="' + extensionJSONS[i].urls[x] + '"></script>' + '\n\t\t\t\t\t <!-- extensions:js -->');
				}
			};
		};
	}

	GLOBAL.meanbaseGlobals.extensions = null;

	try {
		// Write the results back to index.html in client/ folder
		fs.writeFileSync(config.root + '/client/index.html', index, 'utf8');
		console.log('writing to index from index');
	} catch(error) {
		console.log('error: ', error);
	}
}