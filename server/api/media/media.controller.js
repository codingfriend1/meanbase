'use strict';

var _ = require('lodash');
var Media = require('./media.model');
var CRUD = require('../../components/CRUD');
var collection = new CRUD(Media);
var fse = require('fs-extra');

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
	Media.create(req.body, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    process.on("thumbnails created", function () {
      console.log('thumbs event finished');
      res.json(201, found);
    });
  });
};

// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {

	// Since the identifier comes in from query instead of body we need to parse it
	if(req.query && req.query.url) {
    try {
      req.query.url = JSON.parse(req.query.url);
    } catch (err) {
      //Keep the url the same
    }
		
	}

	// After deleting the image data from the database we need to delete the image folders
  collection.delete(req, res, function() {
    if(req.query.url) {
      if(req.query.url['$in']) {
        for(var i = 0; i < req.query.url['$in'].length; i++) {
          fse.remove('./client/' + req.query.url['$in'][i]);
        }
      } else {
        fse.remove('./client/' + req.query.url);
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