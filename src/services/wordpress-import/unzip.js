import path from 'path'
const Decompress = require('decompress');
const zip = require('decompress-unzip');
const formidable = require('formidable');
import feathersErrors from 'feathers-errors'
import fs from 'fs';

export default function(req, res, next) {
  const app = this;

  if(!req.app || !req.app.get('themesPath')) {
    next(new Error('themesPath not found on server'));
  }

  var createdFolderName = '125098dsflkj1324';

  var createdFolderPath = path.join(req.app.get('themesPath'), createdFolderName);
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

      req.feathers.tempFilePath = tempFilePath;
      next();
    });
  } catch(err) {
    return next(err);
  }
}
