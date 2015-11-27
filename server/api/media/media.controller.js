'use strict';

var _ = require('lodash');
var Media = require('./media.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Media);
var fse = require('fs-extra');
var config = require('../../config/environment');
var app = config.app;
var path = require('path');

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
  // Handled by multer in config/express.js
};

// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  console.log('hi');
  var url = 'ahlsdfjh32k23jh532';
	// Since the identifier comes in from query instead of body we need to parse it
	if(req.query && req.query.where) {
    try {
      req.query.where = JSON.parse(req.query.where);
      if(req.query.where.url) {
        url = req.query.where.url;
      }
    } catch (err) {
      //Keep the url the same
    }
		
	}

  if(url) {
    try {
      if(url.$in) {
        for(var i = 0; i < url.$in.length; i++) {
          var folderName = url.$in[i] || 'al23gl239';
          fse.remove(path.join(app.get('appPath'), folderName));
        }
      } else {
        fse.remove(path.join(app.get('appPath'), url));
      }
      collection.delete(req, res, function() {});
    } catch(err) {
      console.log("err", err);
    }
  }
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
  console.log('by id');
  collection.deleteById(req, res);
};

// Handles the response to database errors
function handleError(res, err) {
  return res.send(500, err);
}