'use strict';

var _ = require('lodash');
var Extension = require('./extension.model');
var CRUD = require('../../components/CRUD');
var collection = new CRUD(Extension);
var Decompress = require('decompress');
var zip = require('decompress-unzip');
var formidable = require('formidable');
var initExtensions = require('../../init/extensions.js');
var fse = require('fs-extra');
var fs = require('fs');
var compileIndex = require('../../components/index/index.js');
var config = require('../../config/environment');
var app = config.app;

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

// Extracts a new theme to the database.
exports.upload = function(req, res) {
  var createdFolderName = '125098dsflkj1324';
  try {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) { 
      if(err) { uploadingExtensionError(err, res, createdFolderName); }
      var tempFilePath = files.file.path;
      var userFileName  = files.file.name;
      var contentType   = files.file.type;

      createdFolderName = userFileName.replace(/\.[^/.]+$/, "");

      var decompress = new Decompress()
        .src(tempFilePath)
        .dest(app.get('appPath') + 'extensions/' + createdFolderName)
        .use(zip({strip: 1}));
      decompress.run(function (err, files) {
        if (err) { throw err; }
        initExtensions(function(error) {
          if(error) { return uploadingExtensionError(error, res, createdFolderName); }
          // Insert the new links and scripts into the index.html page
          compileIndex(null, GLOBAL.meanbaseGlobals.extensions);
          res.status(200).send();
        });
      });
      
    });
  } catch(e) {
    uploadingExtensionError(e, res, createdFolderName);
  }
};

// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  collection.delete(req, res);
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


function uploadingExtensionError(err, res, folderName) {
  console.log('Could not upload extension.', err);
  if(folderName && folderName !== '') {
    try {
      fse.remove(app.get('appPath') + 'extensions/' + folderName);
    } catch(e) {
      console.log('Could not delete extension from extensions folder', e);
    }
    
  }
  res.status(500).send(err);
}