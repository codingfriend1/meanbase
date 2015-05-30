var fs = require('fs');
var Themes = require('../api/themes/themes.model');
var helpers = require('../components/helpers');

module.exports = function(callback) {
	console.log('Checking for themes...');

	// Loop through themes in themesFolderUrl and get the theme.json file out of the root of each one
	Themes.find({active: true}).lean().exec(function (err, activeTheme) {
	  if(err) { return handleError(err); }
	  if(!Array.isArray(activeTheme)) {
	  	activeTheme = [activeTheme];
	  }
	  if(!activeTheme[0] || !activeTheme[0].url) { activeTheme[0].url = ''; }
	  var themeJSONS = helpers.retrieveThemes(activeTheme[0].url, callback);

		// Remove all found themes
		if(themeJSONS.length > 0) {
			Themes.remove(function(err) {
		 		if(err) { return handleError(err); }
		  	Themes.create(themeJSONS, function(err, theme) {
				  if(err) { return handleError(err); }
				  console.log('themes initialized');
				  if(callback) { return callback(null); }
				});
			});
		}


	}); //themes find
	

	function handleError(err) {
		if(callback) { callback(err); }
	  return console.log('Initializing themes error: ', err);
	}
};