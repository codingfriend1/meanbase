'use strict';

var _ = require('lodash');
var Menus = require('./menus.model');
var DAO = require('../../components/DAO');
var collection = new DAO(Menus);
var helpers = require('../../components/helpers');

var onlyPublished = false;

collection.modifyBody = function(body) {
  // if(body && body.url && body.url.charAt(0) !== '/') {
  //   body.url = '/' + body.url;
  // }
  return body;
};

collection.modifyIdentifier = function(identifier) {
  if(identifier && onlyPublished) {
    identifier.published = true; //Make all mongoDB queries search for content that has published as true
    onlyPublished = false;
  }
  return identifier;
};

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res, restructureMenus);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res, restructureMenus);
};

exports.findPublished = function(req, res) {
  onlyPublished = true;
  collection.find(req, res, restructureMenus);
};

exports.searchPublished = function(req, res) {
  onlyPublished = true;
  collection.search(req, res, restructureMenus);
};

exports.findPublishedById = function(req, res) {
  onlyPublished = true;
  collection.find(req, res, restructureMenus);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  if(req.body && req.body.main && Array.isArray(req.body.main)) {
    req.body = helpers.objectToArray(req.body);
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

function restructureMenus(response) {
  if(!response) { return response; }
  if(!Array.isArray(response)) { response = [response]; }
	var allMenus = response;

	// Sort the menus into groups so angular can use them easily
	var i = 0, menus = {};
	while(i < allMenus.length) {
    if(onlyPublished && !allMenus[i].published) {
      allMenus.splice(i, 1);
    }
	  if(menus[allMenus[i].group] === undefined) {
	    menus[allMenus[i].group] = [];
	  }
	  menus[allMenus[i].group].push(allMenus[i]);
	  i++;
	}

	return menus;
}