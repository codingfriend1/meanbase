const fs = require('fs');
const Finder = require('fs-finder');
const path = require('path');
const _ = require('lodash');
import feathersErrors from 'feathers-errors'
import fse from 'fs-extra'

/**
 * Requires hook.params.themeUrl to be set. If theme has all necessary content, it sets hook.data to the theme data
 */
export default function(options) {
  return hook => {

    return new Promise((resolve, reject) => {

      if(!hook.params.themeUrl) { return reject(new Error('themeUrl not found.')); }

      // Loop through themes in hook.app.get('themesPath') and get the theme.json file out of the root of each one

      const themePath = path.join(hook.app.get('themesPath'), hook.params.themeUrl);

      let themeUrl = hook.params.themeUrl;
      if (hook.params.themeUrl.charAt(hook.params.themeUrl.length - 1) == '/') {
        themeUrl = hook.params.themeUrl.substr(0, myString.length - 1);
      }

      if(!themeUrl) { theme.url = '2G13j13523lksdf73520sFASGSDFweT'; }

      const deletePath = path.join(hook.app.get('themesPath'), themeUrl);


      if(!fs.lstatSync(themePath).isDirectory()) { return reject('Theme is not a folder'); }
      var themeFolder = fs.readdirSync(themePath);

      if(!themeFolder || !themeFolder[0]) { return reject('Theme url not found.'); }

      // Will contain all our theme.json's
      var themejson = {};

      // Assume no themes are active
      var anyActive = false;

      try {

        try {
          var themeFiles = Finder.from(themePath).findFiles('<-template\.jade|-template\.html|(scripts|styles)\.html|theme\.json|screenshot>');
        } catch(err) {
          console.log('could not navigate theme files', err);
          if(deletePath) {
            fse.remove(deletePath);
          }
          return reject('Could not navigate theme folder structure.', err);
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
          file = file.replace(hook.app.get('clientPath') + '/', '');

          if(file.includes('theme.json')) { // Get the theme.json

            themeData.themeJSONPath = file;

            // Grab the theme.json data
            try {
              themeJSONFileContents = JSON.parse(
                fs.readFileSync( path.join(hook.app.get('clientPath'), file), 'utf8')
              );
            } catch(err) {
              console.log("Could not parse json", err);
              if(deletePath) {
                fse.remove(deletePath);
              }
              return reject(new Error("Could not find a valid theme.json file in the theme. If it's there, make sure it doesn't have any errors."));
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

          themeJSONFileContents.url = hook.params.themeUrl;

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
            if(Object.keys(themeJSONFileContents.templates).length === 0) {
              if(deletePath) {
                fse.remove(deletePath);
              }
              return reject(new Error('Theme had no templates. At least one file must have a -template.html or -template.jade ending'));
            }

            themejson = themeJSONFileContents;
            themeData = {};
            themeJSONFileContents = {};

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
                if(deletePath) {
                  fse.remove(deletePath);
                }
                return reject(new feathersErrors.BadRequest('Theme had no templates. At least one file must have a -template.html or -template.jade ending'));
              }
            }
            themejson = themeJSONFileContents;
            themeData = {};
            themeJSONFileContents = {};
          }
        }

      } catch (err) {
        if(deletePath) {
          fse.remove(deletePath);
        }
        return reject(err);
        console.log("validating themes error", err);
      }

      hook.data = themejson;
      return resolve(hook);

    });
  }
};
