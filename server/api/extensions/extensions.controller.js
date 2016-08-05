'use strict';

var _ = require('lodash');
var Extensions = require('./extensions.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Extensions);
var Decompress = require('decompress');
var zip = require('decompress-unzip');
var formidable = require('formidable');
var initExtensions = require('../../init/extensions.js');
var fse = require('fs-extra');
var fs = require('fs');
var compileIndex = require('../../components/index/index.js');
var config = require('../../config/environment');
var app = config.app;
var path = require('path');

collection.modifyBody = function(body) {
  return body;
};

collection.modifyIdentifier = function(identifier) {
  return identifier;
};

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  collection.create(req, res);
};

// Extracts a new extension to the database.
exports.upload = function(req, res) {
  var createdFolderName = '125098dsflkj1324';

  var createdFolderPath = path.join(app.get('appPath'), 'app', 'extensions', createdFolderName);

  try {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if(err) { return uploadingError('The extension folder must be compressed in the correct format.', res, createdFolderName); }
      if(!files || !files.file) {
        return res.status(501).send('The extension folder must be compressed.');
      }
      var tempFilePath = files.file.path;
      var userFileName  = files.file.name;
      var contentType   = files.file.type;

      createdFolderName = userFileName.substring(userFileName.lastIndexOf('/'), userFileName.indexOf('.', userFileName.lastIndexOf('/')) );

      if(!createdFolderName || !/^[a-zA-Z0-9_-]+$/.test(createdFolderName)) {
        return res.status(501).send('Extension folder name was invalid: "' + createdFolderName + '". It should only contain letters, numbers, and - or _');
      }

      var compressType;
      var decompress = new Decompress();
      switch(contentType) {
        case 'application/x-gzip':
          compressType = Decompress.targz;
          break;
        case 'application/zip':
          compressType = Decompress.zip;
          break;
        case 'application/x-tar':
          compressType = Decompress.tar;
          break;
        case 'application/x-bzip2':
          compressType = Decompress.tar;
          break;
        default:
          compressType = null;
      }

      if(!compressType) {
        return res.status(501).send('Please send a zip, gz, bz2, or tar file type.');
      }

      try {
        // Query the entry
        var stats = fs.lstatSync(createdFolderPath);
        // Is it a directory?
        if (stats.isDirectory()) {
          return res.status(501).send('An extension with that name has already been uploaded. Please choose a different folder name for your extension.');
        }
      } catch (e) {}

      decompress
      .src(tempFilePath)
      .dest(createdFolderPath)
      .use(compressType({strip: 1}));

      decompress.run(function (err, files) {
        if (err) {
          console.log("unzipping extension error: ", err);
          return res.status(501).send(err);
        }
        initExtensions(function(error) {
          if(error) { return uploadingError(error, res, createdFolderName); }
          // Insert the new links and scripts into the index.html page
          compileIndex(null, GLOBAL.meanbaseGlobals.extensions);
          res.status(200).send();
        });
      });

    });
  } catch(e) {
    uploadingError(e, res, createdFolderName);
  }
};

// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  collection.delete(req, res, function(identifier) {
    if(identifier && identifier.folderName && identifier.folderName !== '') {
      try {
        fse.remove(path.join(app.get('appPath'), 'extensions', identifier.folderName));
        return res.status(204).send();
      } catch(e) {
        console.log('Could not delete extension', e);
        return res.status(500).send();
      }
    }
  });
};

// Get a single pages
exports.findById = function(req, res) {
  collection.findById(req, res);
};

// Updates an existing page in the DB.
exports.updateById = function(req, res) {
  collection.updateById(req, res);
};

// Deletes a pages from the DB.
exports.deleteById = function(req, res) {
  collection.deleteById(req, res);
};


function uploadingError(err, res, folderName) {
  console.log('Could not upload extension.', err);
  if(folderName && folderName !== '') {
    try {
      fse.remove(path.join(app.get('appPath'), 'extensions', folderName));
    } catch(e) {
      console.log('Could not delete extension from extensions folder', e);
    }

  }
  return res.status(500).send(err);
}
