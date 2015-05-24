var fs = require('fs');

module.exports = function(callback) {
	console.log('creating themes...');
	var Themes = require('../api/themes/themes.model');
	var themesFolderUrl = 'client/themes/';


	// Loop through themes in themesFolderUrl and get the theme.json file out of the root of each one
	var themesFolder = fs.readdirSync(themesFolderUrl);
	var themeJSONS = [];
	var anyActive = false;
	Themes.find({active: true}).lean().exec(function (err, activeTheme) {
	  if(err) { return handleError(err); }
	  activeTheme = activeTheme[0];
	  if(!activeTheme || !activeTheme.url) {
	  	activeTheme.url = '';
	  }

		for(var file = 0; file < themesFolder.length; file++) {
			if(themesFolder[file][0] !== '.') {
				var stat = fs.statSync(themesFolderUrl + themesFolder[file]);
				if(stat.isDirectory()) {
					try {
						var themeJSON = JSON.parse(fs.readFileSync(themesFolderUrl + themesFolder[file] + '/theme.json', 'utf8'));
						if(themeJSON && Object.prototype.toString.call(themeJSON) === "[object Object]") {
							themeJSON.url = themesFolder[file];
							if(themeJSON.url === activeTheme.url) {
								anyActive = true;
								themeJSON.active = true;
							}
							themeJSONS.push(themeJSON);
						}
					} catch(error) {
						if(callback) { return callback('Could not find theme.json in root of theme'); }
						console.log('Could not find theme.json in root of theme: ' + error);
					}
				}
			}
		} //for


		// Set the first theme active automatically just as something to start with
		if(!anyActive) { themeJSONS[0].active = true; }

		// Remove all found themes
		if(themeJSONS) {
			Themes.remove(function(err) {
		 		if(err) { return handleError(err); }
		  	Themes.create(themeJSONS, function(err, theme) {
				  if(err) { return handleError(err); }
				  if(callback) {
				  	return callback(null);
				  }
				  console.log('themes initialized');
				});
			});
		}


	}); //themes find

	
	

	// Find all themes in database
	// if(themeJSONS) {
		// Themes.find(function (err, themes) {
		//   if(err) { return handleError(err); }
		//   if(themes.length > 0) { return false; }
	 //  	Themes.create(themeJSONS, function(err, theme) {
		// 	  if(err) { return handleError(err); }
		// 	  console.log('themes initialized');
		// 	});
		// });
	// }
	

	function handleError(err) {
		if(callback) { callback(err); }
	  return console.log('Initializing themes error: ', err);
	}
};