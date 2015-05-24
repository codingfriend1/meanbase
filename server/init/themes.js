var fs = require('fs');

module.exports = function() {
	console.log('creating themes...');
	var Themes = require('../api/themes/themes.model');
	var themesFolderUrl = 'client/themes/';


	// Loop through themes in themesFolderUrl and get the theme.json file out of the root of each one
	var themesFolder = fs.readdirSync(themesFolderUrl);
	var themeJSONS = [];
	var anyActive = false;
	for(var file = 0; file < themesFolder.length; file++) {
		if(themesFolder[file][0] !== '.') {
			var stat = fs.statSync(themesFolderUrl + themesFolder[file]);
			if(stat.isDirectory()) {
				try {
					var themeJSON = JSON.parse(fs.readFileSync(themesFolderUrl + themesFolder[file] + '/theme.json', 'utf8'));
					themeJSON.url = themesFolder[file];
					if(themeJSON.active == true) {
						anyActive = true;
					}
					themeJSONS.push(themeJSON);
				} catch(error) {
					console.log('Could not find theme.json in root of theme', error);
				}
			}
		}
	}

	// Set the first theme active automatically just as something to start with
	if(!anyActive) { themeJSONS[0].active = true; }

	// Remove all found themes
	// Themes.remove(function(err) {
 // 		if(err) { return handleError(err); }
	// });

	// console.log('themeJSONS', themeJSONS);
	// Find all themes in database
	if(themeJSONS) {
		Themes.find(function (err, themes) {
		  if(err) { return handleError(err); }
		  if(themes.length > 0) { return false; }
	  	Themes.create(themeJSONS, function(err, theme) {
			  if(err) { return handleError(err); }
			  console.log('themes initialized');
			});
		});
	}
	

	function handleError(err) {
	  return console.log('Initializing themes error: ', err);
	}
};