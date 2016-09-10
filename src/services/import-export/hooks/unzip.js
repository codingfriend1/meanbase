import path from 'path'
const formidable = require('formidable');
import feathersErrors from 'feathers-errors'
import fs from 'fs';
import fsExtra from 'fs-extra'
const decompress = require('decompress')
const exec = require('child_process').exec

const collections = [
  "extensions",
  "themes",
  "bans",
  "comments",
  "custom",
  "images",
  "menus",
  "pages",
  "roles",
  "settings",
  "staging",
  "users"
]

export default function(req, res, next) {

  if(req.method !== "POST") { return next() }

  function importCollection(collection) {
    return new Promise((resolve, reject) => {
      if(!req.app.get('db') || !collection || !req.app.get('dataExportPath')) { return reject('missing either the collection, db ENV or dataExportPath ENV')}

      const child = exec(`mongoimport --db ${req.app.get('db')} --collection ${collection} --file ${path.join(req.app.get('dataImportPath'), collection + '.json')} --jsonArray`)

      child.on('close', function(code) {
        console.log(`Import of ${collection} was successful`);
        return resolve(`Import of ${collection} was successful`)
      })
    })
  }

  async function removeData(name) {
    console.log('resetting ' + name);
    await req.app.service(name).remove(null, {query:{}})
  }

  if(!req.app || !req.app.get('exportPath')) {
    next(new Error('exportPath not found on server'));
  }

  var createdFolderName = '125098dsflkj1324';

  var createdFolderPath = path.join(req.app.get('exportPath'));
  try {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if(err) {
        console.log("Error parsing zip: ", err);
        return next(new feathersErrors.NotAcceptable('The zip folder must be compressed in the correct format.'));
      }
      if(!files || !files.file) {
        return next(new feathersErrors.NotAcceptable('The zip folder must be compressed.'));
      }

      var tempFilePath = files.file.path;
      var fileName  = files.file.name;
      var contentType   = files.file.type;

      decompress(tempFilePath, req.app.get('exportPath')).then(async files => {
        let currentPath = path.join(req.app.get('exportPath'), 'export')
        try {
          fsExtra.copySync(path.join(currentPath, 'images'), req.app.get('uploadsPath'))
          fsExtra.copySync(path.join(currentPath, 'themes'), req.app.get('themesPath'))
          fsExtra.copySync(path.join(currentPath, 'extensions'), req.app.get('extensionsPath'))
          fsExtra.copySync(path.join(currentPath, 'data'), req.app.get('extensionsPath'))

          for (var i = 0; i < collections.length; i++) {
            try {
              if( fs.lstatSync(path.join(currentPath, 'data', collections[i] + '.json')) ) {
                await removeData(collections[i])
                let response = await importCollection(collections[i])
              }
            } catch(err) {
              console.log("Error importing data", err);
              return next(err)
            }
          }
          console.log("success!")
        } catch (err) {
          console.error(err)
        }
        next()
      })
    });
  } catch(err) {
    return next(err);
  }
}
