'use strict';

var _ = require('lodash');
var Roles = require('./roles.model');

// Get list of roless
exports.index = function(req, res) {
  Roles.find(function (err, roless) {
    if(err) { return handleError(res, err); }
    return res.json(200, roless);
  });
};

// Get a single roles
exports.show = function(req, res) {
  Roles.findById(req.params.id, function (err, roles) {
    if(err) { return handleError(res, err); }
    if(!roles) { return res.send(404); }
    return res.json(roles);
  });
};

// Creates a new roles in the DB.
exports.create = function(req, res) {
  Roles.create(req.body, function(err, roles) {
    if(err) { return handleError(res, err); }
    return res.json(201, roles);
  });
};

// Updates an existing roles in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Roles.findById(req.params.id, function (err, roles) {
    if (err) { return handleError(res, err); }
    if(!roles) { return res.send(404); }
    var updated = _.merge(roles, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, roles);
    });
  });
};

// Deletes a roles from the DB.
exports.destroy = function(req, res) {
  Roles.findById(req.params.id, function (err, roles) {
    if(err) { return handleError(res, err); }
    if(!roles) { return res.send(404); }
    roles.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}