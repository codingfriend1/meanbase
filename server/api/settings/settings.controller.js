'use strict';

var _ = require('lodash');
var Settings = require('./settings.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Settings);
var helpers = require('../../components/helpers');
var compileIndex = require('../../components/index');

exports.find = function(req, res) {
  collection.find(req, res);
};

exports.create = function(req, res) {
  if(req.body.identifier && req.body.identifier.name === 'clientID' || req.body.identifier.name === 'appID') {
    collection.upsert(req, res, function() {
      console.log('compiling index');
      compileIndex(null);
    });
  } else {
    collection.upsert(req, res);
  }
};

// Updates pages in the database
exports.update = function(req, res) {
  if(req.body.identifier && req.body.identifier.name === 'clientID' || req.body.identifier.name === 'appID') {
    collection.upsert(req, res, function() {
      console.log('compiling index');
      compileIndex(null);
    });
  } else {
    collection.upsert(req, res);
  }

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

function handleError(res, err) {
  return res.send(500, err);
}
