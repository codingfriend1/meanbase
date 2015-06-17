'use strict';

var _ = require('lodash');
var SharedContent = require('./shared-content.model');
var DAO = require('../../components/DAO');
var collection = new DAO(SharedContent);

var Pages = require('../pages/pages.model');

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

// Updates pages in the database
exports.update = function(req, res) {
  collection.upsert(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  if(req.query && req.query.where) {
    var existing;
    try {
      existing = JSON.parse(req.query.where);
    } catch(e) {}
    if(existing.contentName.$in) {
      Pages.count({'extensions.contentName': { $in : existing.contentName.$in }}, function(error, number) {
        if(number === 0) {
          collection.delete(req, res);
        } else {
          return res.status(204).send();
        }
      });
    } else {
      collection.delete(req, res);
    }
  } else {
    collection.delete(req, res);
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
  collection.deleteById(req, res);
};