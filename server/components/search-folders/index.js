var config = require('../../config/environment');
var app = config.app;
var fs = require('fs');
var Finder = require('fs-finder');
var Themes = require('../../api/themes/themes.model');
var Promise = require('promise');
var helpers = require('../helpers');

var extractFileNameRegex = /^[0-9A-Za-z(\/|\\)*_.\\\-]*$/;


function isMyPath(item, searchString) {
  if(item.indexOf(searchString) > -1) {
    return item;
  }
}

exports.retrieveThemes = function(activeURL, callback) {
  var themesFolderUrl = app.get('appPath') + 'themes/';
  // Loop through themes in themesFolderUrl and get the theme.json file out of the root of each one
  var themesFolder = fs.readdirSync(themesFolderUrl);
  var themeJSONS = [];
  var anyActive = false;

  var retrievalPromise = new Promise(function (resolve, reject) {
    helpers.asyncLoop(themesFolder.length, function(loop) {
      if(themesFolder[loop.iteration()][0] !== '.' && themesFolder[loop.iteration()][0] !== '_') {
        try {
          var stat = fs.statSync(themesFolderUrl + themesFolder[loop.iteration()]);
        } catch(e) {
          return loop.break('Could not find theme folder'); 
        }
        if(stat.isDirectory()) {
          try {
            try {
              var templateFilePaths = Finder.from(themesFolderUrl + themesFolder[loop.iteration()]).findFiles('<-template\.jade|-template\.html|(scripts|styles)\.html|theme\.json|screenshot>');
            } catch(e) {
              return loop.break('Could not navigate theme folder structure.');
            }
            
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
            for (var i = 0; i < templateFilePaths.length; i++) {
              var templateName;

              templateFilePaths[i] = templateFilePaths[i].replace(app.get('appPath'), '');


              if(templateFilePaths[i].indexOf('theme.json') > -1) {
                // Get the theme.json
                themeData.themeJSONPath = templateFilePaths[i];
              } else if(templateFilePaths[i].indexOf('styles.html') > -1) {
                // Get the theme styles.html
                themeData.stylesHTML = templateFilePaths[i];
              } else if(templateFilePaths[i].indexOf('scripts.html') > -1) {
                // Get the theme scripts.html
                themeData.scriptsHTML = templateFilePaths[i];
              } else if(templateFilePaths[i].indexOf('screenshot') > -1 && templateFilePaths[i].indexOf('-screenshot') === -1) {
                // If we are looking at the theme screenshot
                themeData.preview = templateFilePaths[i];      
              } else if(templateFilePaths[i].indexOf('-screenshot') > -1) { 
                // If a template has a screenshot store it's url
                templateName = templateFilePaths[i].match(/[^(\/|\\)]*(?=-screenshot.[^.]+($|\?))/);
                if(templateName && templateName[0] && /^[0-9A-Za-z\/\*_.\\\-]*$/.test(templateFilePaths[i])) {
                  if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }
                  templates[templateName[0]].screenshot = templateFilePaths[i];
                }
              } else {
                // If we are looking at an actual template
                // We want to remove the super long absolute path and replace with a relative one
                templateFilePaths[i] = templateFilePaths[i];

                // We want to extract the template name from the file name without the file extension or the -template
                templateName = templateFilePaths[i].match(/[^(\/|\\)]*(?=-template.[^.]+($|\?))/);
                // Since the client makes jade requests without the extension we remove it.
                templateFilePaths[i] = templateFilePaths[i].replace('.jade', '');
                if(templateName && templateName[0] && /^[0-9A-Za-z\/\*_.\\\-]*$/.test(templateFilePaths[i])) {
                  if(!templates[templateName[0]]) { templates[templateName[0]] = {}; }
                  templates[templateName[0]].template = templateFilePaths[i];
                }
              }

            }



            try {
              themeData.themeJSON = JSON.parse(fs.readFileSync(app.get('appPath') + themeData.themeJSONPath, 'utf8'));
            } catch(e) {
              return loop.break("Could not find a valid theme.json file in the theme. If it's there, make sure it doesn't have any errors."); 
            }
                      
            if(themeData.themeJSON && Object.prototype.toString.call(themeData.themeJSON) === "[object Object]") {

              themeData.themeJSON.url = themesFolder[loop.iteration()];

              if(themeData.themeJSON.url === activeURL) {
                anyActive = true;
                themeData.themeJSON.active = true;
              }

              themeData.themeJSON.themeJSONPath = themeData.themeJSONPath;

              if(templates) {
                themeData.themeJSON.templatePaths = templates;
              }

              if(themeData.stylesHTML && extractFileNameRegex.test(themeData.stylesHTML)) {
                themeData.themeJSON.stylesPath = themeData.stylesHTML;
              }

              if(themeData.scriptsHTML && extractFileNameRegex.test(themeData.scriptsHTML)) {
                themeData.themeJSON.scriptsPath = themeData.scriptsHTML;
              }

              if(themeData.preview && extractFileNameRegex.test(themeData.preview)) {
                themeData.themeJSON.preview = themeData.preview;
              }

              if(themeData.themeJSON.url) {
                Themes.find({url: themeData.themeJSON.url}).lean().exec(function(err, theme) {
                  if(theme[0] && theme[0].templates) { 
                    // themeJSONS[loop.iteration()].templates = theme[0].templates;
                    themeData.themeJSON.templates = theme[0].templates;
                  } else {
                    var templateMaps = {};
                    if(!themeData.themeJSON.templates) {
                      for (var template in templates) {
                        if (templates.hasOwnProperty(template)) {
                          if(templates[template].template) {
                            templateMaps[template] = [template];
                          }
                        }
                      }
                      themeData.themeJSON.templates = templateMaps;
                    }
                  }
                  if(Object.keys(themeData.themeJSON.templates).length === 0) {
                    return loop.break('Theme had no templates. At least one file must have a -template.html or -template.jade ending');
                  }
                  themeJSONS.push(themeData.themeJSON);
                  themeData = {};
                  return loop.next();

                });

                return false;

              } else {
                var templateMaps = {};
                if(!themeData.themeJSON.templates) {
                  for (var template in templates) {
                    if (templates.hasOwnProperty(template)) {
                      if(templates[template].template) {
                        templateMaps[template] = [template];
                      }
                    }
                  }
                  themeData.themeJSON.templates = templateMaps;
                  if(Object.keys(themeData.themeJSON.templates).length === 0) {
                    return loop.break('Theme had no templates. At least one file must have a -template.html or -template.jade ending');
                  }
                }

                themeJSONS.push(themeData.themeJSON);
                themeData = {};

                return loop.next();
              }
            } else {
              return loop.next();
            }
          } catch(error) {
            return loop.break('The theme was invalid and could not be saved. ' + error);
          }
        } else {
          return loop.next();
        }
      } else {
        return loop.next();
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

  return retrievalPromise;
};


exports.retrieveExtensions = function(callback) {
  var extensionsFolderUrl = app.get('appPath') + 'extensions/';
  // Loop through themes in extensionsFolderUrl and get the extension.json file out of the root of each one
  var extensionsFolder = fs.readdirSync(extensionsFolderUrl);
  var extensionsJSONS = [];
  for(var ii = 0; ii < extensionsFolder.length; ii++) {
    if(extensionsFolder[ii][0] !== '.' && extensionsFolder[ii][0] !== '_') {
      try {
        var stat = fs.statSync(extensionsFolderUrl + extensionsFolder[ii]);
      } catch(e) {
        return callback('Could not find extension folder'); 
      }
      if(stat.isDirectory()) {
        try {
          var extensionFilePaths = Finder.from(extensionsFolderUrl + extensionsFolder[ii]).findFiles('<\.jade|\.html|\.css|\.js|extension\.json|screenshot>');
          var index, json, files = [], screenshot;
          for (var i = 0; i < extensionFilePaths.length; i++) {
            extensionFilePaths[i] = extensionFilePaths[i].replace(app.get('appPath'), '');
            if(extensionFilePaths[i].indexOf('index.html') > -1) {
              index = extensionFilePaths[i];
            } else if(extensionFilePaths[i].indexOf('extension.json') > -1) {
              json = extensionFilePaths[i];
            } else if(extensionFilePaths[i].indexOf('screenshot') > -1) {
              screenshot = extensionFilePaths[i];
            } else if(extensionFilePaths[i].indexOf('.jade') > -1 && extractFileNameRegex.test(extensionFilePaths[i])) {
              files.push(extensionFilePaths[i].replace('.jade', ''));
            } else if(extractFileNameRegex.test(extensionFilePaths[i])) {
              files.push(extensionFilePaths[i]);
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

          extensionJSON.folderName = extensionsFolder[ii];
          
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