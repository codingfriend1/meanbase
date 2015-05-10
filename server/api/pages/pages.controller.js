'use strict';

var _ = require('lodash');
var Pages = require('./pages.model');
var Comments = require('../comments/comments.model'); //Linked Document
var Menus = require('../menus/menus.model'); //Linked Document
var CRUD = require('../../components/CRUD');
var collection = new CRUD(Pages);

collection.modifyBody = function(body) {
  if(body) {

    if(body.url && body.url.charAt(0) != '/') {
      body.url = '/' + body.url;
    }

    if(body.extensions) {
      body.extensions = unstructureExtensions(body.extensions);
    }
  }
  return body;
};

collection.modifyIdentifier = function(identifier) {
  if(identifier && identifier.url && identifier.url.charAt(0) != '/') {
    identifier.url = '/' + identifier.url;
  }
  return identifier;
};

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res, restructureExtensions);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res, restructureExtensions);
};

// Creates a new pages in the DB.
exports.create = function(req, res) {
  collection.create(req, res);
};

// Updates a page and it's comments' url if changed
exports.updateOneAndUpdate = function(req, res) {
  collection.updateOneAndUpdate(req, res, function(found, newValue) {
    if(found.hasOwnProperty('url') && newValue.hasOwnProperty('url')) {
      if(found.url !== newValue.url) {
        // Update comments with that same url
        collection.setCollection(Comments);
        collection.updateRaw({url: found.url}, {url: newValue.url});
        collection.setCollection(Pages);
      }
    }
  });
};

// Deletes a page in the database and it's comments
exports.deleteOneAndUpdate = function(req, res) {
  collection.deleteOneAndUpdate(req, res, function(found) {
    if(found.url) {
      // Deletes comments with that same url
      collection.setCollection(Comments);
      collection.deleteRaw({url: found.url});
      
      collection.setCollection(Pages);
    }
  });
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


function restructureExtensions(response) {
  if(!response) { return response; }

  if(Object.prototype.toString.call( response ) === '[object Array]') {
    for (var i = 0; i < response.length; i++) {
      var allExtensions = response[i].extensions || [];
      // Sort the menus into groups so angular can use them easily
      var x = 0, extensions = {};
      while(x < allExtensions.length) {
        if(extensions[allExtensions[x].group] == undefined) {
          extensions[allExtensions[x].group] = [];
        }
        extensions[allExtensions[x].group].push(allExtensions[x]);
        x++;
      }
      response[i].extensions = extensions;
    };
    return response;
  } else {
    var allExtensions = response.extensions || [];

    // Sort the menus into groups so angular can use them easily
    var i = 0, extensions = {};
    while(i < allExtensions.length) {
      if(extensions[allExtensions[i].group] == undefined) {
        extensions[allExtensions[i].group] = [];
      }
      extensions[allExtensions[i].group].push(allExtensions[i]);
      i++;
    }

    response.extensions = extensions;
    return response;
  }
};


function unstructureExtensions(extensions) {

  var formattedExtensions = [];
  for (var property in extensions) {
      if (extensions.hasOwnProperty(property)) {
          formattedExtensions = formattedExtensions.concat(extensions[property]);
      }
  }
  return formattedExtensions;
}