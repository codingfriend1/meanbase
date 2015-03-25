var fs = require('fs');

module.exports = function() {
	console.log('creating themes...');
	var Themes = require('../api/themes/themes.model');
	var themesFolderUrl = 'client/themes/';


	// Loop through themes in themesFolderUrl and get the theme.json file out of the root of each one
	var themesFolder = fs.readdirSync(themesFolderUrl);
	var themeJSONS = [];
	for(var file = 0; file < themesFolder.length; file++) {
		if(themesFolder[file][0] !== '.') {
			var stat = fs.statSync(themesFolderUrl + themesFolder[file]);
			if(stat.isDirectory()) {
				try {
					var themeJSON = JSON.parse(fs.readFileSync(themesFolderUrl + themesFolder[file] + '/theme.json', 'utf8'));
					themeJSONS.push(themeJSON);
				} catch(error) {
					console.log('Could not find theme.json in root of theme', error);
				}
			}
		}
	}

	// Remove all themes from the database and insert themes from the theme's folder
	// Find all themes in database
	Themes.find(function (err, themes) {
	  if(err) { return handleError(err); }
	  if(!themes) { return false; }
	  if(!themes) { return false; }
	  // Remove all found themes
	  Themes.remove(function(err) {
	    if(err) { return handleError(err); }
	    // Now that the themes are deleted, create from a fresh start
	  	Themes.create(themeJSONS, function(err, theme) {
  		  if(err) { return handleError(err); }
  		  // console.log('initialize themes: ', theme);
  		  console.log('themes initialized');
  		});
	  });
	});

	function handleError(err) {
	  return console.log('Initializing data error: ', err);
	}
};