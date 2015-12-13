'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var app = config.app;
var path = require('path');
var Downloads = require('./downloads.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Downloads);
var assetsFolder = path.join(config.root, app.get('frontEnd'), 'assets', '/');


collection.modifyBody = function(body) {
  return body;
};

collection.modifyIdentifier = function(identifier) {
  return identifier;
};

// Get some pages
exports.find = function(req, res) {

  var fileName = req.query.where;
  var downloadFolder;

  if(fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
    downloadFolder = path.join(assetsFolder, 'images', '/');
  } else {
    downloadFolder = path.join(assetsFolder, 'other', '/');
  }

  var options = {
    root: downloadFolder,
    dotfiles: 'deny'
  };

  res.sendfile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  collection.create(req, res);
};

// Creates a new pages in the DB.
exports.upload = function(req, res) {
    try {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        if(err) { console.log("Could not upload content."); }
        if(!files || !files.file) {
          return res.status(501).send('The file must exist.');
        }
        var tempFilePath = files.file.path;
        var userFileName  = files.file.name;
        var contentType   = files.file.type;

        importHelper(tempFilePath);
      });
    } catch(err) {
      console.log("uploading wordpress content error", err);
    }

  collection.create(req, res);
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
