'use strict';

var Settings = require('../../api/settings/settings.model.js');

/**
 * Compiles the client/index.html from a copy in server/views/index.html with the chosen theme assets
 * Grunt loads /app/ themes and scripts into server/views/index.html
 */

 var config = require('../../config/environment');
 var app = config.app;
 var fs = require('fs');
 var Themes = require('../../api/themes/themes.model');
 var searchFolders = require('../search-folders');
 var path = require('path');

module.exports = function(theme) {
	if(theme) {
		compileIndex(theme, GLOBAL.meanbaseGlobals.extensions);
	} else {
		Themes.find({active: true}, function(err, found) {
			if(err) { return console.log('Getting active theme error', err); }
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
  var appFilePath, adminFilePath, index, adminIndex, themeCSS, statscss, hasThemeMin = false;
	// Get file paths for the server/views/index and the chosen theme's scripts and styles templates
	var viewFilePath = path.join(config.folders.views, 'index.html');
  var adminFilePath = path.join(config.folders.views, 'admin.html');

	index = fs.readFileSync(viewFilePath,'utf8');
  adminIndex = fs.readFileSync(adminFilePath,'utf8');

  index = injectTheme(index, theme);

	if(!extensionJSONS) {
		GLOBAL.meanbaseGlobals.extensions = searchFolders.retrieveExtensions();
		extensionJSONS = GLOBAL.meanbaseGlobals.extensions;
	}

	if(extensionJSONS) {
    index = injectExtensions(index, extensionJSONS);
	}

	GLOBAL.meanbaseGlobals.extensions = null;

	Settings.findOne({name: 'appID'}, function(err, appID) {
		if(appID) {
			index = index.replace("'appID'", "'" + appID.value + "'");
			adminIndex = adminIndex.replace("'appID'", "'" + appID.value + "'");
		}
    Settings.findOne({name: 'clientID'}, function(err, clientID) {
      if(clientID) {
  			index = index.replace("'clientID'", "'" + clientID.value + "'");
  			adminIndex = adminIndex.replace("'clientID'", "'" + clientID.value + "'");
  		}
      Settings.findOne({name: 'verificationID'}, function(err, verificationID) {
        if(verificationID) {
    			index = index.replace("'verificationID'", verificationID.value);
    			adminIndex = adminIndex.replace("'verificationID'", verificationID.value);
    		}
        try {
  				// Write the results back to index.html in client/ folder
  				fs.writeFileSync(path.join(app.get('appAppPath'), 'index.html'), index, 'utf8');
  				fs.writeFileSync(path.join(app.get('adminPath'), 'index.html'), adminIndex, 'utf8');
  				console.log('writing to index from index');
  			} catch(error) {
  				console.log('error: ', error);
  			}
      })
    });
	});

}


function injectTheme(file, theme) {
  var statsjs, themeJS = '', hasThemeMin, templatesjs, themeTemplateJS = '', stats2js;
  try {
	  statsjs = fs.lstatSync(path.join(app.get('themesFolder'), theme.url, 'theme.min.js'));
	  stats2js = fs.lstatSync(path.join(app.get('themesFolder'), theme.url, 'templates.js'));
	  // Is it a directory?
	  if (statsjs.isFile() && stats2js.isFile()) {
	  	hasThemeMin = true;
	  	themeJS = '<script src="' + path.join('themes', theme.url, 'theme.min.js') + '"></script>';
	  	themeTemplateJS = '<script src="' + path.join('themes', theme.url, 'templates.js') + '"></script>';
	  }
	}
	catch (err) {
		console.log("checking for theme.min.* error", err);
	}

	// If the file reads were successful then insert given theme's assets into index.html
	file = file.replace('theme-name', theme.url);
	file = file.replace("'theme-templates'", JSON.stringify(theme.templates));
	file = file.replace("'themeTemplatePaths'", JSON.stringify(theme.templatePaths));
	file = file.replace('<!-- Theme Script -->', themeJS + themeTemplateJS);

  return file;
}

function injectExtensions(file, extensionJSONS) {
  for (var i = 0; i < extensionJSONS.length; i++) {
    for (var x = 0; x < extensionJSONS[i].urls.length; x++) {

      var jsPattern = new RegExp("\.(js)$");

      if(/\.(js)$/.test(extensionJSONS[i].urls[x])) {
        file = file.replace('<!-- extensions:js -->', '<script src="' + extensionJSONS[i].urls[x] + '"></script>' + '\n\t <!-- extensions:js -->');
      }
    }
  }
  return file;
}
