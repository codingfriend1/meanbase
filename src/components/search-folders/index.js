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
        var themeFiles = Finder.from(fullThemeFolderPath).findFiles('<-template\.jade|-template\.html|-extension\.jade|-extension\.html|(scripts|styles)\.html|theme\.json|screenshot>');
      } catch(err) {
        throw Error('Could not navigate theme folder structure.');
      }

      // The structure for our theme.json
      var templates = {};
      var themeData = {
        templates: {},
        extensions: [],
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
        var templateName, extensionName;
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

          if(templateName && templateName[0] && /^[0-9A-Za-z \/\*_.\\\-]*$/.test(file)) {

            // If a property with this template name does not already exist create it
            if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }

            // Set it's template to this file path
            templates[templateName[0]].template = file;
          }
        } else if(file.includes('-extension')) { // If we are looking at an actual extension

          // We want to remove the super long absolute path and replace with a relative one
          file = file;

          // We want to extract the extension name from the file name without the file extension or the -extension
          extensionName = file.match(/[^(\/|\\)]*(?=-extension.[^.]+($|\?))/);

          // Since the client makes jade requests without the extension we remove it.
          // file = file.replace('.jade', '.html');
          // Check that the extension name is valid

          if(extensionName && extensionName[0] && /^[0-9A-Za-z \/\*_.\\\-]*$/.test(file)) {

            let label = extensionName[0].replace(/[ ]/g, "-").replace(/[_-]/g, " ").replace(/(^| )(\w)/g, function(x) {
              return x.toUpperCase();
            })

            let extension = {}
            extension.label = label
            extension.html = file
            themeData.extensions.push(extension)
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

          themeJSONFileContents.extensions = themeData.extensions

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
          themeJSONFileContents.extensions = themeData.extensions
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

  let extensions = []

  // Loop through themes in app.get('extensionsPath') and get the extension.json file out of the root of each one
  let extensionsFolder
  try {
    extensionsFolder = fs.readdirSync(app.get('extensionsPath'));
  } catch(err) {
    console.log('Error reading extensions path', err);
  }

  for (var ii = 0; ii < extensionsFolder.length; ii++) {
    try {
      let currentFile = extensionsFolder[ii][0]
      let activeFolder = extensionsFolder[ii]
      let currentExtensionPath = path.join(app.get('extensionsPath'), activeFolder)

      if(currentFile === '.' && currentFile === '_') { continue; }

      try {
        let folderContent = fs.statSync(currentExtensionPath)
        if(!folderContent.isDirectory()) { continue }
      } catch(err) {
        continue
      }

      let label = activeFolder.replace(/[ ]/g, "-").replace(/[_-]/g, " ").replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
      })

      var extensionFilePaths = Finder.from(currentExtensionPath).findFiles('<extension.min.js$|-extension.html|-extension.jade|screenshot>')

      let index, screenshot, contents
      let extension = {
        label
      }

      for (var i = 0; i < extensionFilePaths.length; i++) {
        let file = extensionFilePaths[i].replace(path.join(app.get('clientPath'), '/'), '')

        if(file.indexOf('-extension.html') > -1 || file.indexOf('-extension.jade') > -1) {
          console.log('html');
          extension.html = file
        } else if(file.indexOf('screenshot') > -1 && extractFileNameRegex.test(file)) {
          extension.screenshot = file
        } else if(file.indexOf('extension.min.js') > -1) {
          extension.contents = file
        }
      }

      if(!extension.html) {
        throw Error("The extension must contain a {extension-name}-extension.html or {extension-name}-extension.jade file path.");
      }

      if(!extension.contents) {
        throw Error("The extension must contain a extension.min.js file which contains the concatenated code for the extension.");
      }

      extensions.push(extension)

    } catch (err) {
      console.log("searching extension folders error: ", err);
    }
  }
  return extensions
};
