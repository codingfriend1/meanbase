'use strict';

var _ = require('lodash');
var Themes = require('./themes.model');
var CRUD = require('../../components/CRUD');
var setGlobalTheme = require('../../components/themes');
var collection = new CRUD(Themes);

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

exports.activate = function(req, res) {
	if(!req.body.id) { return res.send(500); }
	Themes.update({}, {active: false}, {multi: true}, function(err, found) {
	  if (err) { return res.send(500, err); }
	  Themes.update({_id: req.body.id}, {active: true}, function(error, found) {
	  	if (error) { return res.send(500, error); }
	  	if(!found) { return res.send(404); }
	  	setGlobalTheme(function(theme) {
	  		return res.json(200, theme);
	  	});
	  });
	});
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