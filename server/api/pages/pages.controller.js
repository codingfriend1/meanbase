'use strict';

var _ = require('lodash');
var Pages = require('./pages.model');
var Comments = require('../comments/comments.model'); //Linked Document
var Menus = require('../menus/menus.model'); //Linked Document
var DAO = require('../../components/DAO');
var helpers = require('../../components/helpers');
var collection = new DAO(Pages);
var onlyPublished = false;

collection.modifyBody = function(body) {
  if(body) {

    if(typeof body.url === 'string' && body.url.charAt(0) !== '/') {
      body.url = '/' + body.url;
    }

    if(body.content && !Array.isArray(body.content)) {
      var contentAsArray = [];
      for (var property in body.content) {
        if (body.content.hasOwnProperty(property)) {
          contentAsArray.push({location:property, text: body.content[property]});
        }
      }
      body.content = contentAsArray;
    }
    
    if(body.extensions) {
      body.extensions = helpers.objectToArray(body.extensions);
    }

    if(body.images) {
      body.images = helpers.objectToArray(body.images);
    }
  }
  return body;
};

collection.modifyIdentifier = function(identifier) {
  if(identifier && identifier.url && identifier.url.charAt(0) !== '/') {
    identifier.url = '/' + identifier.url;
  }
  return identifier;
};

// Get list of pages
exports.findAll = function(req, res) {
  collection.findAll(req, res, restructureResponse);
};

// Search
exports.search = function(req, res) {
  collection.search(req, res, restructureResponse);
};

exports.publish = function(req, res) {
  if(req.body) {
    req.body = {published: true};
  }
  collection.updateById(req, res);
};

// Get some pages
exports.find = function(req, res) {
  collection.find(req, res, restructureResponse);
};

exports.findPublished = function(req, res) {
  onlyPublished = true;
  collection.find(req, res, restructureResponse);
};

exports.searchPublished = function(req, res) {
  onlyPublished = true;
  collection.search(req, res, restructureResponse);
};

exports.findPublishedById = function(req, res) {
  onlyPublished = true;
  collection.find(req, res, restructureResponse);
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


function restructureResponse(response) {
  if(!response) { return response; }
  if(!Array.isArray(response)) { response = [response]; }
  
  for (var i = 0; i < response.length; i++) {
    if(response[i]) {
      if(onlyPublished && !response[i].published) {
        response.splice(i, 1);
      } else {
        response[i].images = helpers.arrayToObjectWithObject(response[i].images, 'location');
        response[i].extensions = helpers.arrayToObjectWithArray(response[i].extensions, 'group');
        // if(response[i].url.charAt(0) === '/') { response[i].url = response[i].url.substr(1); }
        if(!response[i].extensions) {
          response[i].extensions = {};
        }
        if(response[i].content) {
          var object = 
          response[i].content = helpers.arrayToObjectWithValue(response[i].content, 'location', 'text');
        }
        if(response[i].created) {
          response[i].created = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        }
        if(response[i].updated) {
          response[i].updated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        }
      }
    }
  }
  onlyPublished = false;
  return response;
}