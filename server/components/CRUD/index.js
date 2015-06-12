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
var helpers = require('../helpers');

function CRUD(collection) {
  this.collection = collection || {}; //Set up the name of the collection we will be interacting with

  // Modify the body before it interacts with the database
  // Should be a function
  this.modifyBody = null;

  // Modify the identifier before it interacts with the database
  // Should be a function
  this.modifyIdentifier = null;
}

// If not set in the constructor you may set the collection here
CRUD.prototype.setCollection = function(collection) {
  this.collection = collection;
};

// Get a single item
CRUD.prototype.findById = function(req, res, callback) {
  try {
    this.collection.findById(req.params.id).lean().exec(function (err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // If the function has a callback use it and if it returns a value send that value instead
      var modified;
      if(callback) { modified = callback(found); }
      if(modified) { found = modified; }
      
      return res.json(found);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Get some items
CRUD.prototype.find = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.find(identifier).lean().exec(function (err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // If the function has a callback use it and if it returns a value send that value instead
      var modified;
      if(callback) { modified = callback(found); }
      if(modified) { found = modified; }
      
      return res.status(200).json(found);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Gets some items and populates their linked documents
CRUD.prototype.findAndPopulate = function(req, res, populateQuery, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.find(identifier).populate(populateQuery).lean().exec(function(err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // If the function has a callback use it and if it returns a value send that value instead
      var modified;
      if(callback) { modified = callback(found); }
      if(modified) { found = modified; }  
      return res.status(200).json(found);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Find items and sort by a filter
CRUD.prototype.findAndSort = function(req, res, callback, sortFilter) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.find(identifier).sort(sortFilter).lean().exec(function(err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // If the function has a callback use it and if it returns a value send that value instead
      var modified;
      if(callback) { modified = callback(found); }
      if(modified) { found = modified; }
      
      return res.status(200).json(found);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Get All items
CRUD.prototype.findAll = function(req, res, callback) {
  try {
    this.collection.find({}).lean().exec(function (err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // If the function has a callback use it and if it returns a value send that value instead
      var modified;
      if(callback) { modified = callback(found); }
      if(modified) { found = modified; }
      
      return res.status(200).json(found);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Creates new items in the collection.
// Accepts an array of items or just one item object
CRUD.prototype.create = function(req, res, callback) {
  try {
    this.collection.create(req.body, function(err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // Since mongoose returns created items as list of params we must iterate through them
      var allFound = getArguments(arguments);
      if(callback) callback(allFound);
      return res.status(201).json(allFound);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Updates existing items in the collection.
CRUD.prototype.update = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.update(identifier, req.body, {multi: true}, function(err, found) {
      if (err) { return handleError(res, err); }
      if(!found) { return res.status(204).send(); }
      var allFound = getArguments(arguments);
      if(callback) callback(req.body);
      return res.status(200).json(allFound);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Updates or Upserts existing items in the collection.
CRUD.prototype.upsert = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.update(identifier, req.body, {multi: true, upsert: true, setDefaultsOnInsert: true}, function(err, found, upserted) {
      if (err) { return handleError(res, err); }
      if(!found) { return res.status(204).send(); }
      var allFound = getArguments(arguments);
      if(callback) callback(req.body);
      return res.status(201).json(allFound);
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

// Updates one existing item in the collection.
CRUD.prototype.updateById = function(req, res, callback) {
  if(req.body._id) { delete req.body._id; }
  try {
    this.collection.findById(req.params.id, function (err, found) {
      if (err) { return handleError(res, err); }
      if(!found) { return res.send(404); }
      var updated = _.merge(found, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        if(callback) callback(req.body);
        return res.status(200).json(found);
      });
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

CRUD.prototype.updateOneAndUpdate = function(req, res, callback) {
  var self = this;
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.findOne(identifier, function(err, found) {
      if (err) { return handleError(res, err); }
      if(!found) { return res.send(404); }
      self.collection.update(identifier, req.body).lean().exec(function(err, updated) {
        if (err) { return handleError(res, err); }
        if(!updated) { return res.send(404); }
        if(found) {
          found = found.toJSON();
          if(callback) { callback(found, req.body); }
        }
        return res.status(200).json(updated);
      });
    });
  } catch(e) {
    mongoErrorHandler(res, e);
  }
};

CRUD.prototype.updateRaw = function(identifier, content) {
  try {
    this.collection.update(identifier, content, {multi: true}, function(err, updated) {});
  } catch(e) {
    console.log("updateRaw failed e", e);
  }
};

// Deletes multiple items from the collection.
CRUD.prototype.delete = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.remove(identifier, function(err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }
      if(callback) callback(identifier);
      return res.status(204).send();
    });
  } catch(e) {
    handleError(res, e);
  }
};

// Deletes a single item from the collection.
CRUD.prototype.deleteById = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.findById(identifier.id, function (err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }
      found.remove(function(err) {
        if(err) { return handleError(res, err); }
        if(callback) callback();
        return res.send(204);
      });
    });
  } catch(e) {
    handleError(res, e);
  }
};

CRUD.prototype.deleteOneAndUpdate = function(req, res, callback) {
  var self = this;
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  try {
    this.collection.findOne(identifier, function(err, found) {
      if (err) { return handleError(res, err); }
      if(!found) { return res.send(404); }
      self.collection.remove(identifier, function(err, deleted) {
        if (err) { return handleError(res, err); }
        if(!deleted) { return res.send(404); }
        if(callback) { callback(found); }
        return res.status(200).json();
      });
    });
  } catch(e) {
    handleError(res, e);
  }
};

CRUD.prototype.deleteRaw = function(identifier) {
  try {
    this.collection.remove(identifier, function(err, response) {});
  } catch(e) {
    console.log("deleteRaw failed", e);
  }
};

// Deletes items from this collections and destories their links in another collection
CRUD.prototype.deleteAndUnlink = function(req, res, callback, linkField, linkModel) {
  var self = this;
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
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


function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// Handles the request object to determine how data was sent to the server
CRUD.prototype.getIdentifer = function(req, res) {
  var identifier = {};
  if(req.query && req.query.where) { //If a raw mongodb query came in
    try {
      identifier = JSON.parse(req.query.where);
    } catch(e) {
      console.log('could not parse req.query.where', req.query.where);
      identifier = req.query.where;
    }
  } else if(req.body && req.body.identifier && req.body.replacement) { //If an update request came in
    identifier = req.body.identifier; 
    req.body = req.body.replacement;
  } else if (!isEmpty(req.body) && !req.body.replacement) { //if an identifier came in through the body
    identifier = req.body; 
  } else if (!isEmpty(req.query)) { //If the query is not empty use it directly
    identifier = req.query;
  } else if (req.params) { //Otherwise use params
    identifier = req.params;
  }

  if(helpers.containsUndefined(identifier)) {
    return mongoErrorHandler(res, err);
  }

  // Modify the req.body before it interacts with the database
  if(this.modifyBody) { req.body = this.modifyBody(req.body) }

  // Modify the identifier before it interacts with the database
  if(this.modifyIdentifier) { identifier = this.modifyIdentifier(identifier) }
  if(identifier) {
    return identifier;
  } else {
    return false;
  }
}

// Handles the response to database errors
function handleError(res, err) {
  return res.status(500).send(err);
}

function mongoErrorHandler(res, err) {
  return res.status(409).send(err);
}

function getArguments(args) {
  // Since mongoose returns created items as list of params we must iterate through them
  var allFound = [];
  for (var i = 1; i < args.length; ++i) {
    allFound.push(args[i]);
  }
  return allFound;
}