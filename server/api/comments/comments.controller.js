'use strict';

var _ = require('lodash');
var Comments = require('./comments.model');
var Settings = require('../settings/settings.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Comments);

var onlyApproved = false;
var creatingComment = false;
var autoApprove = false;

collection.modifyBody = function(body) {
  if(body && body.url && body.url.charAt(0) !== '/') {
    body.url = '/' + body.url;
  }
  if(body && creatingComment) {
    if(body.approved) { body.approved = false; }
  }

  return body;
};

collection.modifyIdentifier = function(identifier) {
  if(identifier && identifier.url && identifier.url.charAt(0) !== '/') {
    identifier.url = '/' + identifier.url;
  }
  if(identifier && onlyApproved) {
    identifier.approved = true;
  }
  return identifier;
};

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res, restructureResponse);
};

exports.findApproved = function(req, res) {
  onlyApproved = true;
  collection.find(req, res, restructureResponse);
  onlyApproved = false;
};

exports.search = function(req, res) {
  onlyApproved = true;
  collection.search(req, res, restructureResponse);
  onlyApproved = false;
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  // For security purposes we want to modify the comment in modifyBody 
  // to not have approved already set to true
  creatingComment = true;

  Settings.findOne({name: 'auto-accept-comments'}, function(err, found) {
      if(err || !found) { autoApprove = false; }
      else { autoApprove = found.value === 'true'; }

      if(req.body && req.body.url) {
        req.body.ip = req.ip;
        req.body.approved = autoApprove;
      }

      collection.create(req, res);
      creatingComment = false;
  });
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

function restructureResponse(response) {
  if(!response) { return response; }
  if(!Array.isArray(response)) { response = [response]; }
  
  for (var i = 0; i < response.length; i++) {
    if(response[i]) {
      if(response[i].date) {
        response[i].date = response[i].date + '';
        // response[i].date = response[i].date.replace(/T/, ' ').replace(/\..+/, '');
      }
    }
  }
  return response;
}