'use strict';

/*
  * CRUD
  * controls operations with a collection in the database from server requests
  
  * getIdentifer()
    - All requests get run through getIdentifer which determines whether data is coming in through body, params, or query

  * handleError()
    - Universal handler for error messages. Currently returns a 500 along with the error.

  * findById               - finds by _id
  * find                   - finds by mongoDB query
  * findAndPopulate        - finds by mongoDB query *requires 
  * findAndSort            - finds by mongoDB query
  * findAll  

  * create                 - object(s) should be sent on req.body
  * createAndLink          - object(s) should be sent on req.body

  * update
    - The identifier should be sent on req.body.identifier and replacement data on req.body.replacement
    - Or identifier should be in params or query while replacement data should be sent through req.body
  * updateById             - req.params should have an _id and replacement data should be on req.body

  * delete                 - deletes by mongoDB query
  * deleteById             - looks for an _id property anywhere on req object
  * deleteAndDependancies  - deletes by mongoDB query
  * deleteAndUnlink        - deletes by mongoDB query

*/



var _ = require('lodash');

function CRUD(collection) {
  this.collection = collection || {}; //Set up the name of the collection we will be interacting with
}

// If not set in the constructor you may set the collection here
CRUD.prototype.setCollection = function(collection) {
  this.collection = collection;
};

// Get a single item
CRUD.prototype.findById = function(req, res, callback) {
  this.collection.findById(req.params.id, function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    if(callback) var modified = callback(found);
    if(modified) { found = modified; }
    
    return res.json(found);
  });
};

// Get some items
CRUD.prototype.find = function(req, res, callback) {
  var identifier = getIdentifer(req);
  this.collection.find(identifier, function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    if(callback) var modified = callback(found);
    if(modified) { found = modified; }
    
    return res.json(200, found);
  });
};

// Gets some items and populates their linked documents
CRUD.prototype.findAndPopulate = function(req, res, callback, populate) {
  var identifier = getIdentifer(req);
  this.collection.find(identifier).populate(populateQuery).exec(function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    if(callback) var modified = callback(found);
    if(modified) { found = modified; }
    
    return res.json(200, found);
  });
};

// Find items and sort by a filter
CRUD.prototype.findAndSort = function(req, res, callback, sortFilter) {
  var identifier = getIdentifer(req);
  this.collection.find(identifier).sort(sortFilter).exec(function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    if(callback) var modified = callback(found);
    if(modified) { found = modified; }
    
    return res.json(200, found);
  });
};

// Get All items
CRUD.prototype.findAll = function(req, res, callback) {
  this.collection.find(function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    if(callback) var modified = callback(found);
    if(modified) { found = modified; }
    
    return res.json(200, found);
  });
};

// Creates new items in the collection.
// Accepts an array of items or just one item object
CRUD.prototype.create = function(req, res, callback) {
  this.collection.create(req.body, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // Since mongoose returns created items as list of params we must iterate through them
    var allFound = getArguments(arguments);
    if(callback) callback(allFound);
    return res.json(201, allFound);
  });
};

// Creates a new item in this collection and links it to another collection.
CRUD.prototype.createAndLink = function(req, res, callback, linkModel, linkField) {
  this.collection.create(req.body, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }
    var linkObject = {};
    linkObject[linkField] = newDocument._id;
    linkModel.update(linkIdentifier, {$push: linkObject}, function(err, updatedFind) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }
      if(callback) callback();
      return res.json(201, updatedFind);
    });
  });
};

// Updates existing items in the collection.
CRUD.prototype.update = function(req, res, callback) {
  var identifier = getIdentifer(req);
  console.log('req.body', req.body);
  this.collection.update(identifier, req.body, {multi: true}, function(err, found) {
    if (err) { return handleError(res, err); }
    if(!found) { return res.send(404); }
    var allFound = getArguments(arguments);
    if(callback) callback(req.body);
    return res.json(200, allFound);
  });
};

// Updates one existing item in the collection.
CRUD.prototype.updateById = function(req, res, callback) {
  if(req.body._id) { delete req.body._id; }
  this.collection.findById(req.params.id, function (err, found) {
    if (err) { return handleError(res, err); }
    if(!found) { return res.send(404); }
    var updated = _.merge(found, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      if(callback) callback(req.body);
      return res.json(200, found);
    });
  });
};

// Deletes multiple items from the collection.
CRUD.prototype.delete = function(req, res, callback) {
  var identifier = getIdentifer(req);
  this.collection.remove(identifier, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }
    if(callback) callback();
    return res.send(204);
  });
};

// Deletes a single item from the collection.
CRUD.prototype.deleteById = function(req, res, callback) {
  var identifier = getIdentifer(req);
  this.collection.findById(identifier._id, function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }
    found.remove(function(err) {
      if(err) { return handleError(res, err); }
      if(callback) callback();
      return res.send(204);
    });
  });
};

// Deletes some items from this collection 
// and any linked documents that depended on it from another collection
CRUD.prototype.deleteAndDependancies = function(req, res, callback, dependantField, dependantModel) {
  var identifier = getIdentifer(req);
  var self = this;
  this.collection.find(identifier, function(err, foundOrigional) {
    if(err) { return handleError(res, err); }
    if(!foundOrigional) { return res.send(404); }
    var i = 0, ids = [];
    while(i < foundOrigional.length) {
      ids = ids.concat(foundOrigional[i][dependantField]);
      i++;
    }
    // Delete document dependancies
    dependantModel.remove({_id: {$in: ids}}, function(err, foundDependancies) {
      if(err) { return handleError(res, err); }
      if(!foundDependancies) { return res.send(404); }
      // Delete the document itself
      self.model.remove(identifier, function(err, found) {
        if(err) { return handleError(res, err); }
        if(callback) callback();
        return res.send(204);
      });
    });
  }); //this.collection.find
};

// Deletes items from this collections and destories their links in another collection
CRUD.prototype.deleteAndUnlink = function(req, res, callback, linkField, linkModel) {
  var self = this;
  var identifier = getIdentifer(req);
  self.model.find(identifier, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    var ids = [], i = 0;
    while(i < found.length) {
      ids.push(found[i]._id);
      i++;
    }
    var dependantObject = {}, dependantObject2 = {}, endUpdateQuery = {};
    if(ids.length > 1) {
      dependantObject[linkField] = {$in: ids};
    } else {
      dependantObject[linkField] = ids[0];
    }
    dependantObject2[linkField] = ids;

    // Unlink from
    linkModel.update(dependantObject, {$pullAll: dependantObject2}, {multi: true}, function(err, found) {
      if(err) { return handleError(res, err); }
      self.model.remove({_id: {$in: ids}}, function(err, found) {
        if(err) { return handleError(res, err); }
        if(callback) callback();
        return res.send(204);
      });
    });

  });
};

module.exports = CRUD;

// Handles the request object to determine how data was sent to the server
function getIdentifer(req) {
  var identifier = {};
  if(req.body && req.body.identifier && req.body.replacement) {
    identifier = req.body.identifier; 
    req.body = req.body.replacement;
  } else if (req.query) {
    identifier = req.query;
  } else if (req.params) {
    identifier = req.params;
  }
  return identifier;
}

// Handles the response to database errors
function handleError(res, err) {
  return res.send(500, err);
}

function getArguments(args) {
  // Since mongoose returns created items as list of params we must iterate through them
  var allFound = [];
  for (var i = 1; i < args.length; ++i) {
    allFound.push(args[i]);
  }
  return allFound;
}