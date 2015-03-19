'use strict';

var _ = require('lodash');
var Pages = require('./pages.model');
var CRUD = require('../../components/CRUD');
var collection = new CRUD(Pages);

// Get list of pages
exports.index = function(req, res) {
  Pages.find(function (err, pages) {
    if(err) { return handleError(res, err); }
    return res.json(200, pages);
  });
};

// Get some pages
exports.find = function(req, res) {
  console.log('req', req.params);
  // Pages.find(req.params, function (err, pages) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, pages);
  // });
};

// Get a single pages
exports.show = function(req, res) {
  Pages.findById(req.params.id, function (err, pages) {
    if(err) { return handleError(res, err); }
    if(!pages) { return res.send(404); }
    return res.json(pages);
  });
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  Pages.create(req.body, function(err, pages) {
    if(err) { return handleError(res, err); }
    return res.json(201, pages);
  });
};

// Updates an existing pages in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pages.findById(req.params.id, function (err, pages) {
    if (err) { return handleError(res, err); }
    if(!pages) { return res.send(404); }
    var updated = _.merge(pages, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pages);
    });
  });
};

// Deletes a pages from the DB.
exports.destroy = function(req, res) {
  Pages.findById(req.params.id, function (err, pages) {
    if(err) { return handleError(res, err); }
    if(!pages) { return res.send(404); }
    pages.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}