'use strict';

var Settings = require('../../api/settings/settings.model.js');

/**
 * Compiles the client/index.html from a copy in server/views/index.html with the chosen theme assets
 * Grunt loads /app/ themes and scripts into server/views/index.html
 */

 var fs = require('fs');
 var searchFolders = require('../search-folders');
 var path = require('path');

module.exports = async function(theme) {
  const app = this;
	if(theme) {
		compileIndex.call(this, theme, global.meanbaseGlobals.extensions);
	} else {
    try {
      const found = await app.service('themes').find({active: true});

      if(found.length < 1) {
        const theme = await getFirstTheme.call(this);
        compileIndex.call(this, theme, global.meanbaseGlobals.extensions);
      } else {
        compileIndex.call(this, found[0], global.meanbaseGlobals.extensions);
      }
    } catch (err) {
      console.log('Getting active theme error', err);
    }
	}
}

async function getFirstTheme() {
  const app = this;

  try {
    const found = app.service('themes').find({ query: {} });
    if(found.length < 1) { throw Error('could not find any themes'); }
    return found[0];
  } catch(err) {
    console.log("Could not get the first theme", err);
  }
}

// Gets the scripts and styles from the chosen theme and inserts them into the index.html
async function compileIndex(theme, extensionjsons) {
  const app = this;

  var appFilePath, adminIndexPath, index, adminIndex, themeCSS, statscss, hasThemeMin = false;
	// Get file paths for the server/views/index and the chosen theme's scripts and styles templates

	var appIndexPath = path.join(app.get('appPath'), 'index.html');
  var adminIndexPath = path.join(app.get('adminPath'), 'admin.html');

  try {
    index = fs.readFileSync(appIndexPath,'utf8');
    adminIndex = fs.readFileSync(adminIndexPath,'utf8');

    index = injectTheme.call(this, index, theme);

  	if(!extensionjsons) {
  		global.meanbaseGlobals.extensions = searchFolders.retrieveExtensions();
  		extensionjsons = global.meanbaseGlobals.extensions;
  	}

  	if(extensionjsons) {
      index = injectExtensions(index, extensionjsons);
  	}

  	global.meanbaseGlobals.extensions = null;

    const appID = app.service('settings').find({query: {name: 'appID'}});
    const clientID = app.service('settings').find({query: {name: 'clientID'}});
    const verificationID = app.service('settings').find({query: {name: 'verificationID'}});
    const recaptchaClientKey = app.service('settings').find({query: {name: 'recaptchaClientKey'}});

    if(appID) {
      index = index.replace("'appID'", "'" + appID.value + "'");
      adminIndex = adminIndex.replace("'appID'", "'" + appID.value + "'");
    }

    if(clientID) {
      index = index.replace("'clientID'", "'" + clientID.value + "'");
      adminIndex = adminIndex.replace("'clientID'", "'" + clientID.value + "'");
    }

    if(verificationID) {
      index = index.replace("'verificationID'", verificationID.value);
      adminIndex = adminIndex.replace("'verificationID'", verificationID.value);
    }

    if(recaptchaClientKey) {
      index = index.replace("RecaptchaClientKey", recaptchaClientKey.value);
    }

    try {
      // Write the results back to index.html in client/ folder
      fs.writeFileSync(path.join(app.get('appPath'), 'index.html'), index, 'utf8');
      fs.writeFileSync(path.join(app.get('adminPath'), 'index.html'), adminIndex, 'utf8');
      console.log('writing to index from index');
    } catch(error) {
      console.log('Error writing themes and extensions to index.html ', error);
    }
  } catch(err) {
    console.log("Error compiling index.html: ", err);
  }
}


function injectTheme(file, theme) {
  const app = this;
  var statsjs, themeJS = '', hasThemeMin, templatesjs, themeTemplateJS = '', stats2js;
  try {
	  statsjs = fs.lstatSync(path.join(app.get('themesFolder'), theme.url, 'theme.min.js'));
	  // stats2js = fs.lstatSync(path.join(app.get('themesFolder'), theme.url, 'templates.js'));
	  // Is it a directory?
	  if (statsjs.isFile()) {
	  	hasThemeMin = true;
	  	themeJS = '<script src="' + path.join('themes', theme.url, 'theme.min.js') + '"></script>';
	  	// themeTemplateJS = '<script src="' + path.join('themes', theme.url, 'templates.js') + '"></script>';
	  }
	}
	catch (err) {
		console.log("checking for theme.min.* error", err);
	}

	// If the file reads were successful then insert given theme's assets into index.html
	file = file.replace('theme-name', theme.url);
	file = file.replace("'theme-templates'", JSON.stringify(theme.templates));
	file = file.replace("'themeTemplatePaths'", JSON.stringify(theme.templatePaths));
	file = file.replace('<!-- Theme Script -->', themeJS);

  return file;
}

function injectExtensions(file, extensionjsons) {
  for (var i = 0; i < extensionjsons.length; i++) {
    for (var x = 0; x < extensionjsons[i].urls.length; x++) {

      var jsPattern = new RegExp("\.(js)$");

      if(/\.(js)$/.test(extensionjsons[i].urls[x])) {
        file = file.replace('<!-- extensions:js -->', '<script src="' + extensionjsons[i].urls[x] + '"></script>' + '\n\t <!-- extensions:js -->');
      }
    }
  }
  return file;
}
