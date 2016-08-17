const fs = require('fs');
const Finder = require('fs-finder');
const path = require('path');
const _ = require('lodash');

var extractFileNameRegex = /^[0-9A-Za-z(\/|\\)*_.\\\-]*$/;

/**
 * Returns the required theme.json file contents plus other required information
 * @param {string} activeURL The folder name of the active theme
 * @param {function} cb Callback function
 */
exports.retrieveThemes = async function(activeURL) {
  const app = this;

  // Loop through themes in app.get('themesPath') and get the theme.json file out of the root of each one
  var themesFolder = fs.readdirSync(app.get('themesPath'));

  if(!themesFolder) { throw Error('Themes folder not found.'); }

  // Will contain all our theme.json's
  var themejsons = [];

  // Assume no themes are active
  var anyActive = false;

  for (var a = 0; a < themesFolder.length; a++) {
    try {
      var currentThemeFolderName = themesFolder[a];
      var fullThemeFolderPath = path.join(app.get('themesPath'), currentThemeFolderName);

      // Skip over hidden folders
      if(currentThemeFolderName[0] === '.' || currentThemeFolderName[0] === '_') {
        continue;
      }

      // Try to read the file and test if it is a folder
      try {
        var stat = fs.statSync(fullThemeFolderPath);
        if(!stat.isDirectory()) { continue; }
      } catch(e) {
        throw Error('Could not find theme folder');
      }

      try {
        var themeFiles = Finder.from(fullThemeFolderPath).findFiles('<-template\.jade|-template\.html|(scripts|styles)\.html|theme\.json|screenshot>');
      } catch(err) {
        throw Error('Could not navigate theme folder structure.');
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
        file = file.replace(app.get('clientPath') + '/', '');

        if(file.includes('theme.json')) { // Get the theme.json

          themeData.themeJSONPath = file;

          // Grab the theme.json data
          try {
            themeJSONFileContents = JSON.parse(
              fs.readFileSync( path.join(app.get('clientPath'), file), 'utf8')
            );
          } catch(err) {
            console.log("err", err);
            throw Error("Could not find a valid theme.json file in the theme. If it's there, make sure it doesn't have any errors.");
          }

        } else if(file.includes('-screenshot')) { // If a template has a screenshot store it's url
          //Get just the name
          templateName = file.match(/[^(\/|\\)]*(?=-screenshot.[^.]+($|\?))/);

          // If the template name is valid
          if(templateName && templateName[0] && /^[0-9A-Za-z\/\*_.\\\-]*$/.test(file)) {
            // If a property with this template name does not already exist create it
            if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }

            // Set it's screenshot to this file path
            templates[templateName[0]].screenshot = file;
          }

        } else if(file.includes('screenshot')) { // If we are looking at the theme screenshot

          themeData.preview = file;

        } else if(file.includes('-template')) { // If we are looking at an actual template

          // We want to remove the super long absolute path and replace with a relative one
          file = file;

          // We want to extract the template name from the file name without the file extension or the -template
          templateName = file.match(/[^(\/|\\)]*(?=-template.[^.]+($|\?))/);
          // Since the client makes jade requests without the extension we remove it.
          // file = file.replace('.jade', '.html');
          // Check that the template name is valid
          if(templateName && templateName[0] && /^[0-9A-Za-z\/\*_.\\\-]*$/.test(file)) {

            // If a property with this template name does not already exist create it
            if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }

            // Set it's template to this file path
            templates[templateName[0]].template = file;
          }
        }
      } //themeFiles loop

      if(!_.isEmpty(themeJSONFileContents)) {

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

        if(themeData.preview && extractFileNameRegex.test(themeData.preview)) {
          themeJSONFileContents.preview = themeData.preview;
        }

        if(themeJSONFileContents.url) {
          let theme = await app.service('themes').find({ query: {url: themeJSONFileContents.url}});
          if(theme[0] && theme[0].templates) {
            // themejsons[iteration].templates = theme[0].templates;
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
            throw new Error('Theme had no templates. At least one file must have a -template.html or -template.jade ending');
          }

          var templateMaps = {};
          for (var template in templates) {
            if (templates.hasOwnProperty(template)) {
              if(templates[template].template) {
                templateMaps[template] = [template];
              }
            }
          }

          themejsons.push(themeJSONFileContents);
          themeData = {};
          themeJSONFileContents = {};

          continue;

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
              throw Error('Theme had no templates. At least one file must have a -template.html or -template.jade ending');
              continue;
            }
          }
          themejsons.push(themeJSONFileContents);
          themeData = {};
          themeJSONFileContents = {};
          continue;
        }
      } else {
        continue;
      }




    } catch (err) {
      console.log("validating themes error", err);
    } finally {
      if(a < themesFolder.length) {
        continue;
      }
    }
  }

  if(!anyActive && themejsons[0]) { themejsons[0].active = true; }
  return themejsons;
};


exports.retrieveExtensions = async function() {
  const app = this;

  // Loop through themes in app.get('extensionsPath') and get the extension.json file out of the root of each one
  try {
    var extensionsFolder = fs.readdirSync(app.get('extensionsPath'));
    var extensionjsons = [];
    for(var ii = 0; ii < extensionsFolder.length; ii++) {
      var currentFile = extensionsFolder[ii][0];
      var activeFolder = extensionsFolder[ii];
      var currentExtensionPath = path.join(app.get('extensionsPath'), activeFolder);

      if(currentFile !== '.' && currentFile !== '_') {
        try {
          var folderContent = fs.statSync(currentExtensionPath);
        } catch(e) {
          throw new Error('Could not find extension folder');
        }

        if(folderContent.isDirectory()) {
          try {
            // var extensionFilePaths = Finder.from(currentExtensionPath).findFiles('<\.jade|\.html|\.css|\.js|extension\.json|screenshot>');
            var extensionFilePaths = Finder.from(currentExtensionPath).findFiles('<extension.min.js|index.html|extension\.json|screenshot>');
            var index, json, files = [], screenshot;

            for (var i = 0; i < extensionFilePaths.length; i++) {
              var currentExtensionFile = extensionFilePaths[i];
              currentExtensionFile = extensionFilePaths[i].replace(app.get('clientPath'), '');

              if(currentExtensionFile.indexOf('index.html') > -1) {
                index = currentExtensionFile;
              } else if(currentExtensionFile.indexOf('extension.json') > -1) {
                json = currentExtensionFile;
              } else if(currentExtensionFile.indexOf('screenshot') > -1) {
                screenshot = currentExtensionFile;
              } else if(currentExtensionFile.indexOf('.jade') > -1 && extractFileNameRegex.test(currentExtensionFile)) {
                files.push(currentExtensionFile);
              } else if(extractFileNameRegex.test(currentExtensionFile)) {
                files.push(currentExtensionFile);
              }

            }

            try {
              var extensionjson = JSON.parse(fs.readFileSync(app.get('clientPath') + json, 'utf8'));
            } catch(e) {
              throw Error("Could not find a valid extension.json file in the extension. If it's there, make sure it doesn't have any errors.");
            }

            try {
              extensionjson.text = fs.readFileSync(app.get('clientPath') + index, 'utf8');
            } catch(e) {
              throw Error("Could not find an index.html in the extension. An extension needs this file to know what to compile.");
            }

            extensionjson.folderName = activeFolder;

            if(files) {
              extensionjson.urls = files;
            }

            if(screenshot && extractFileNameRegex.test(screenshot)) {
              extensionjson.screenshot = screenshot;
            }

            extensionjsons.push(extensionjson);

            extensionFilePaths = null;
            index = null;
            json = null;
            files = [];
            screenshot = null;
            extensionjson = {};
          } catch(error) {
            throw Error('Could not parse extension.json in root of extension', error);
          }
        } // if is folder
      } // if file does not begin with . or _
    } //for
  //
  } catch (err) {
    console.log("searching extension folders error: ", err);
  } finally {
    return extensionjsons;
  }
};
