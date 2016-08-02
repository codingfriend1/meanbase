var config = require('../../config/environment');
var app = config.app;
var fs = require('fs');
var Finder = require('fs-finder');
var Themes = require('../../api/themes/themes.model');
var Promise = require('promise');
var helpers = require('../helpers');
var path = require('path');
var _ = require('lodash');

var extractFileNameRegex = /^[0-9A-Za-z(\/|\\)*_.\\\-]*$/;


function isMyPath(item, searchString) {
  if(item.indexOf(searchString) > -1) {
    return item;
  }
}

/**
 * Returns the required theme.json file contents plus other required information
 * @param {string} activeURL The folder name of the active theme
 * @param {function} cb Callback function
 */
exports.retrieveThemes = function(activeURL, callback) {
  // Loop through themes in app.get('themesFolder') and get the theme.json file out of the root of each one
  var themesFolder = fs.readdirSync(app.get('themesFolder'));

  // Will contain all our theme.json's
  var themeJSONS = [];

  // Assume no themes are active
  var anyActive = false;

  return new Promise(function (resolve, reject) {
    helpers.asyncLoop(themesFolder.length, function(loop) {
      var currentThemeFolderName = themesFolder[loop.iteration()];
      var fullThemeFolderPath = path.join(app.get('themesFolder'), currentThemeFolderName);

      // Skip over hidden folders
      if(currentThemeFolderName[0] === '.' || currentThemeFolderName[0] === '_') {
        return loop.next();
      }

      // Try to read the file and test if it is a folder
      try {
        var stat = fs.statSync(fullThemeFolderPath);
        if(!stat.isDirectory()) { return loop.next(); }
      } catch(e) {
        return loop.break('Could not find theme folder');
      }

      try {
        try {
          var themeFiles = Finder.from(fullThemeFolderPath).findFiles('<-template\.jade|-template\.html|(scripts|styles)\.html|theme\.json|screenshot>');
        } catch(e) {
          return loop.break('Could not navigate theme folder structure.');
        }

        // The structure for our theme.json
        var templates = {};
        var themeData = {
          templates: {},
          themeJSONPath: null,
          stylesHTML: null,
          scriptsHTML: null,
          preview: null,
          templateFilePaths: null,
          themeJSON: {}
        };

        var themeJSONFileContents = {};

        // Populate the themeData with correct file paths
        // And populate the templates with screenshot and template file paths
        // Read the theme.json data
        for (var i = 0; i < themeFiles.length; i++) {
          var templateName;
          var file = themeFiles[i];

          // We only want a porition of the url for relative searches
          file = file.replace(app.get('appPath'), '');

          if(_.contains(file, 'theme.json')) { // Get the theme.json

            themeData.themeJSONPath = file;

            // Grab the theme.json data
            try {
              themeJSONFileContents = JSON.parse(
                fs.readFileSync( path.join(app.get('appPath'), file), 'utf8')
              );
            } catch(err) {
              console.log("err", err);
              return loop.break("Could not find a valid theme.json file in the theme. If it's there, make sure it doesn't have any errors.");
            }

          } else if(_.contains(file, 'styles.html')) { // Get the theme styles.html

            themeData.stylesHTML = file;

          } else if(_.contains(file, 'scripts.html')) { // Get the theme scripts.html

            themeData.scriptsHTML = file;

          } else if(_.contains(file, '-screenshot')) { // If a template has a screenshot store it's url
            //Get just the name
            templateName = file.match(/[^(\/|\\)]*(?=-screenshot.[^.]+($|\?))/);

            // If the template name is valid
            if(templateName && templateName[0] && /^[0-9A-Za-z\/\*_.\\\-]*$/.test(file)) {
              // If a property with this template name does not already exist create it
              if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }

              // Set it's screenshot to this file path
              templates[templateName[0]].screenshot = file;
            }

          } else if(_.contains(file, 'screenshot')) { // If we are looking at the theme screenshot

            themeData.preview = file;

          } else if(_.contains(file, '-template')) { // If we are looking at an actual template

            // We want to remove the super long absolute path and replace with a relative one
            file = file;

            // We want to extract the template name from the file name without the file extension or the -template
            templateName = file.match(/[^(\/|\\)]*(?=-template.[^.]+($|\?))/);
            // Since the client makes jade requests without the extension we remove it.
            file = file.replace('.jade', '.html');
            // Check that the template name is valid
            if(templateName && templateName[0] && /^[0-9A-Za-z\/\*_.\\\-]*$/.test(file)) {

              // If a property with this template name does not already exist create it
              if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }

              // Set it's template to this file path
              templates[templateName[0]].template = file;
            }
          }
        } //themeFiles loop

        if(_.isPlainObject(themeJSONFileContents)) {

          themeJSONFileContents.url = currentThemeFolderName;

          if(themeJSONFileContents.url === activeURL) {
            anyActive = true;
            themeJSONFileContents.active = true;
          }

          themeJSONFileContents.themeJSONPath = themeData.themeJSONPath;

          var hasAllTemplates = true;
          if(templates) {
            for (var page in templates) {
              if (templates.hasOwnProperty(page)) {
                if(!templates[page].template) { hasAllTemplates = false; break; }
              }
            }
          } else {
            hasAllTemplates = false;
          }

          if(hasAllTemplates && !themeJSONFileContents.templatePaths) {
            themeJSONFileContents.templatePaths = templates;
          }

          if(themeData.stylesHTML && extractFileNameRegex.test(themeData.stylesHTML)) {
            themeJSONFileContents.stylesPath = themeData.stylesHTML;
          }

          if(themeData.scriptsHTML && extractFileNameRegex.test(themeData.scriptsHTML)) {
            themeJSONFileContents.scriptsPath = themeData.scriptsHTML;
          }

          if(themeData.preview && extractFileNameRegex.test(themeData.preview)) {
            themeJSONFileContents.preview = themeData.preview;
          }

          if(themeJSONFileContents.url) {
            Themes.find({url: themeJSONFileContents.url}).lean().exec(function(err, theme) {
              if(theme[0] && theme[0].templates) {
                // themeJSONS[iteration].templates = theme[0].templates;
                themeJSONFileContents.templates = theme[0].templates;
              } else {
                var templateMaps = {};
                if(!themeJSONFileContents.templates) {
                  for (var template in templates) {
                    if (templates.hasOwnProperty(template)) {
                      if(templates[template].template) {
                        templateMaps[template] = [template];
                      }
                    }
                  }
                  themeJSONFileContents.templates = templateMaps;
                }
              }
              if(Object.keys(themeJSONFileContents.templates).length === 0) {
                return loop.break('Theme had no templates. At least one file must have a -template.html or -template.jade ending');
              }
              themeJSONS.push(themeJSONFileContents);
              themeData = {};
              themeJSONFileContents = {};
              return loop.next();

            });

          } else {
            var templateMaps = {};
            if(!themeJSONFileContents.templates) {
              for (var template in templates) {
                if (templates.hasOwnProperty(template)) {
                  if(templates[template].template) {
                    templateMaps[template] = [template];
                  }
                }
              }
              themeJSONFileContents.templates = templateMaps;
              if(Object.keys(themeJSONFileContents.templates).length === 0) {
                return loop.break('Theme had no templates. At least one file must have a -template.html or -template.jade ending');
              }
            }
            themeJSONS.push(themeJSONFileContents);
            themeData = {};
            themeJSONFileContents = {};
            return loop.next();
          }
        } else {
          return loop.next();
        }
      } catch(error) {
        return loop.break('The theme was invalid and could not be saved. ' + error);
      }

    }).then(function() {
      // If no themes were already active make the first one retrieved active
      if(!anyActive && themeJSONS[0]) { themeJSONS[0].active = true; }
      resolve(themeJSONS);
    }, function(reason) {
      console.log("Searching theme folders failed: ", reason);
      if(callback) { callback(reason); }
      reject(themeJSONS);
    });
  });
};


exports.retrieveExtensions = function(callback) {
  // Loop through themes in app.get('extensionsFolder') and get the extension.json file out of the root of each one
  var extensionsFolder = fs.readdirSync(app.get('extensionsFolder'));
  var extensionsJSONS = [];
  for(var ii = 0; ii < extensionsFolder.length; ii++) {
    var currentFile = extensionsFolder[ii][0];
    var activeFolder = extensionsFolder[ii];
    var currentExtensionPath = path.join(app.get('extensionsFolder'), activeFolder);

    if(currentFile !== '.' && currentFile !== '_') {
      try {
        var folderContent = fs.statSync(currentExtensionPath);
      } catch(e) {
        return callback('Could not find extension folder');
      }

      if(folderContent.isDirectory()) {
        try {
          // var extensionFilePaths = Finder.from(currentExtensionPath).findFiles('<\.jade|\.html|\.css|\.js|extension\.json|screenshot>');
          var extensionFilePaths = Finder.from(currentExtensionPath).findFiles('<extension.min.js|templates.js|index.html|extension\.json|screenshot>');
          var index, json, files = [], screenshot;

          for (var i = 0; i < extensionFilePaths.length; i++) {
            var currentExtensionFile = extensionFilePaths[i];
            currentExtensionFile = extensionFilePaths[i].replace(app.get('appPath'), '');

            if(currentExtensionFile.indexOf('index.html') > -1) {
              index = currentExtensionFile;
            } else if(currentExtensionFile.indexOf('extension.json') > -1) {
              json = currentExtensionFile;
            } else if(currentExtensionFile.indexOf('screenshot') > -1) {
              screenshot = currentExtensionFile;
            // } else if(currentExtensionFile.indexOf('.jade') > -1 && extractFileNameRegex.test(currentExtensionFile)) {
            //   files.push(currentExtensionFile.replace('.jade', ''));
            } else if(extractFileNameRegex.test(currentExtensionFile)) {
              files.push(currentExtensionFile);
            }

          }

          try {
            var extensionJSON = JSON.parse(fs.readFileSync(app.get('appPath') + json, 'utf8'));
          } catch(e) {
            return callback("Could not find a valid extension.json file in the extension. If it's there, make sure it doesn't have any errors.");
          }

          try {
            extensionJSON.text = fs.readFileSync(app.get('appPath') + index, 'utf8');
          } catch(e) {
            return callback("Could not find an index.html in the extension. An extension needs this file to know what to compile.");
          }

          extensionJSON.folderName = activeFolder;

          if(files) {
            extensionJSON.urls = files;
          }

          if(screenshot && extractFileNameRegex.test(screenshot)) {
            extensionJSON.screenshot = screenshot;
          }

          extensionsJSONS.push(extensionJSON);

          extensionFilePaths = null;
          index = null;
          json = null;
          files = [];
          screenshot = null;
          extensionJSON = {};
        } catch(error) {
          console.log('Could not parse extension.json in root of extension', error);
          if(callback) { callback(error); return extensionsJSONS; }
        }
      }
    }
  } //for

  return extensionsJSONS;
};
