const fs = require('fs');
const Finder = require('fs-finder');
const path = require('path');
const _ = require('lodash');
import feathersErrors from 'feathers-errors'
import fse from 'fs-extra'

const extractFileNameRegex = /^[0-9A-Za-z(\/|\\)*_.\\\-]*$/;

/**
 * Requires hook.params.extensionUrl to be set. If theme has all necessary content, it sets hook.data to the theme data
 */
export default function(options) {
  return hook => {

    return new Promise((resolve, reject) => {

      if(!hook.params.extensionUrl) { return reject('extensionUrl not found.'); }

      const deletePath = path.join(hook.app.get('extensionsPath'), hook.params.extensionUrl);

      const extensionFolderPath = path.join(hook.app.get('extensionsPath'), hook.params.extensionUrl);

      const extensionFolder = hook.params.extensionUrl

      try {
        try {
          var folderContent = fs.statSync(extensionFolderPath);
        } catch(err) {
          if(deletePath) {
            fse.remove(deletePath);
          }
          console.log("Error reading extension content", err);
          return reject(new feathersErrors.Unprocessable('Could not find the extension folder'));
        }

        let label = extensionFolder.replace(/[ ]/g, "-").replace(/[_-]/g, " ").replace(/(^| )(\w)/g, function(x) {
          return x
        })


        var extension = {
          label,
          folder: extensionFolder
        };

        if(folderContent.isDirectory()) {
          try {
            try {
              var extensionFilePaths = Finder.from(extensionFolderPath).findFiles('<extension.min.js$|-extension.html|-extension.jade|screenshot>')

              let index, screenshot, contents

              for (var i = 0; i < extensionFilePaths.length; i++) {
                let file = extensionFilePaths[i].replace(path.join(hook.app.get('clientPath'), '/'), '')

                if(file.indexOf('-extension.html') > -1 || file.indexOf('-extension.jade') > -1) {
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
            } catch(err) {
              if(deletePath) {
                fse.remove(deletePath);
              }
              console.log('Error searching files', err);
              return reject(new feathersErrors.NotAcceptable('Extension folder did not contain valid content.'))
            }
          } catch(err) {
            if(deletePath) {
              fse.remove(deletePath);
            }
            console.log("Error reading extension content", err);
            return reject(new feathersErrors.GeneralError(err));
          }
        } // if is folder
      //
      } catch (err) {
        console.log("validating extension error", err);
        if(deletePath) {
          fse.remove(deletePath);
        }
        return reject(err);
      } finally {
        hook.data = extension;
        return resolve(hook);
      }

    });
  }
};

// if(deletePath) {
//   fse.remove(deletePath);
// }
