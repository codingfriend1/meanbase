var config = require('../../config/environment');
var app = config.app;
var fs = require('fs');
var Finder = require('fs-finder');

exports.arrayToObjectWithArray = function(array, itemToBecomeProperty) {
  if(!array || !itemToBecomeProperty) { return array; }
  if(!Array.isArray(array)) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      if(returnObject[specialProperty] === undefined) {
        returnObject[specialProperty] = [];
      }
      returnObject[specialProperty].push(array[ii]);
    }
    
  } //for

  return returnObject;
};

exports.arrayToObjectWithObject = function(array, itemToBecomeProperty) {
  if(!array || !itemToBecomeProperty) { return array; }
  if( !Array.isArray(array) ) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      returnObject[specialProperty] = array[ii];
    }
  } //for
  return returnObject;
};

exports.objectToArray = function(data) {
  if(!data || data === null || typeof data !== 'object') { return data; }
  var returnArray = [];
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      returnArray = returnArray.concat(data[property]);
    }
  }
  return returnArray;
};

exports.retrieveThemes = function(activeURL, callback) {
  var themesFolderUrl = app.get('appPath') + 'themes/';
  // Loop through themes in themesFolderUrl and get the theme.json file out of the root of each one
  var themesFolder = fs.readdirSync(themesFolderUrl);
  var themeJSONS = [];
  var anyActive = false;

  for(var file = 0; file < themesFolder.length; file++) {
    if(themesFolder[file][0] !== '.') {
      var stat = fs.statSync(themesFolderUrl + themesFolder[file]);
      if(stat.isDirectory()) {
        try {
          var templateFilePaths = Finder.from(themesFolderUrl + themesFolder[file]).findFiles('<-template\.jade|-template\.html|(scripts|styles)\.html|theme\.json|screenshot>');
          var templates = {};
          var themeJSONPath, stylesHTML, scriptsHTML, preview;
          for (var i = 0; i < templateFilePaths.length; i++) {
            templateFilePaths[i] = templateFilePaths[i].replace(app.get('appPath'), '');
            if(templateFilePaths[i].indexOf('theme.json') > -1) {
              // Get the theme.json
              themeJSONPath = templateFilePaths[i];
            } else if(templateFilePaths[i].indexOf('styles.html') > -1) {
              // Get the theme styles.html
              stylesHTML = templateFilePaths[i];
            } else if(templateFilePaths[i].indexOf('scripts.html') > -1) {
              // Get the theme scripts.html
              scriptsHTML = templateFilePaths[i];
            } else if(templateFilePaths[i].indexOf('screenshot') > -1 && templateFilePaths[i].indexOf('-screenshot') === -1) {
              // If we are looking at the theme screenshot
              preview = templateFilePaths[i];      
            } else if(templateFilePaths[i].indexOf('-screenshot') > -1) { 
              // If a template has a screenshot store it's url
              var templateName = templateFilePaths[i].match(/[^\/]*(?=-screenshot.[^.]+($|\?))/);
              if(templateName && templateName[0]) {
                if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }
                templates[templateName[0]].screenshot = templateFilePaths[i];
              }
            } else {
              // If we are looking at an actual template
              // We want to remove the super long absolute path and replace with a relative one
              templateFilePaths[i] = templateFilePaths[i];

              // We want to extract the template name from the file name without the file extension or the -template
              var templateName = templateFilePaths[i].match(/[^\/]*(?=-template.[^.]+($|\?))/);
              // Since the client makes jade requests without the extension we remove it.
              templateFilePaths[i] = templateFilePaths[i].replace('.jade', '');
              if(templateName && templateName[0]) {
                if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }
                templates[templateName[0]].template = templateFilePaths[i];
              }
            }
          };
          var themeJSON = JSON.parse(fs.readFileSync(app.get('appPath') + themeJSONPath, 'utf8'));          
          if(themeJSON && Object.prototype.toString.call(themeJSON) === "[object Object]") {
            themeJSON.url = themesFolder[file];
            if(themeJSON.url === activeURL) {
              anyActive = true;
              themeJSON.active = true;
            }

            themeJSON.themeJSONPath = themeJSONPath;

            if(templates) {
              themeJSON.templatePaths = templates;
            }

            if(stylesHTML) {
              themeJSON.stylesPath = stylesHTML;
            }

            if(scriptsHTML) {
              themeJSON.scriptsPath = scriptsHTML;
            }

            if(preview) {
              themeJSON.preview = preview;
            }
            
            themeJSONS.push(themeJSON);
          }
        } catch(error) {
          if(callback) { callback('Could not find theme.json in root of theme'); }
          console.log('Could not find theme.json in root of theme: ' + error);
          return themeJSONS;
        }
      }
    }
  } //for

  // If no themes were already active make the first one retrieved active
  if(!anyActive) { themeJSONS[0].active = true; }

  return themeJSONS;
};

exports.retrieveExtensions = function(callback) {
  var extensionsFolderUrl = app.get('appPath') + 'extensions/';
  // Loop through themes in extensionsFolderUrl and get the extension.json file out of the root of each one
  var extensionsFolder = fs.readdirSync(extensionsFolderUrl);
  var extensionsJSONS = [];
  for(var ii = 0; ii < extensionsFolder.length; ii++) {
    if(extensionsFolder[ii][0] !== '.' && extensionsFolder[ii][0] !== '_') {
      var stat = fs.statSync(extensionsFolderUrl + extensionsFolder[ii]);
      if(stat.isDirectory()) {
        try {
          var extensionJSON = JSON.parse(fs.readFileSync(extensionsFolderUrl + extensionsFolder[ii] + '/extension.json', 'utf8'));
          extensionJSON.text = fs.readFileSync(extensionsFolderUrl + extensionsFolder[ii] + '/index.html', 'utf8');
          extensionsJSONS.push(extensionJSON);
        } catch(error) {
          console.log('Could not parse extension.json in root of extension', error);
          if(callback) { callback(error); return extensionsJSONS; }
        }
      }
    }
  } //for

  return extensionsJSONS;
};
