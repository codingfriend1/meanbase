'use strict';

var _ = require('lodash');
var Menus = require('./menus.model');
var CRUD = require('../../components/CRUD');
var collection = new CRUD(Menus);

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res, restructureMenus);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res, restructureMenus);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
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
	var allMenus = response;

	// Sort the menus into groups so angular can use them easily
	var i = 0, menus = {};
	while(i < allMenus.length) {
	  if(menus[allMenus[i].group] == undefined) {
	    menus[allMenus[i].group] = [];
	  }
	  menus[allMenus[i].group].push(allMenus[i]);
	  i++;
	}

	return menus;
};