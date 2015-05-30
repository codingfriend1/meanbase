var fs = require('fs');

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
          if(themeJSON && Object.prototype.toString.call(themeJSON) === "[object Object]") {
            themeJSON.url = themesFolder[file];
            if(themeJSON.url === activeURL) {
              anyActive = true;
              themeJSON.active = true;
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
  var extensionsFolderUrl = './client/extensions/';
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
