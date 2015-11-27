'use strict';
/**
 * @overview Controls operations with a database collection made from http requests
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 */

// ## API
/*
  * **getIdentifer**  
    - All requests get run through getIdentifer which determines whether data is coming in through body, params, or query

  * **handleError**  
    - Universal handler for error messages. Currently returns a 500 along with the error.

  * **findById**               - finds by _id
  * **find**                   - finds by mongoDB query
  * **findAndPopulate**        - finds by mongoDB query *requires 
  * **findAndSort**            - finds by mongoDB query
  * **findAll**  

  * **create**                 - object(s) should be sent on req.body
  * **createAndLink**          - object(s) should be sent on req.body

  * **update**  
    - The identifier should be sent on req.body.identifier and replacement data on req.body.replacement
    - Or identifier should be in params or query while replacement data should be sent through req.body
  * **updateById**             - req.params should have an _id and replacement data should be on req.body

  * **delete**                 - deletes by mongoDB query
  * **deleteById**             - looks for an _id property anywhere on req object
  * **deleteAndDependancies**  - deletes by mongoDB query
  * **deleteAndUnlink**        - deletes by mongoDB query

*/



var _ = require('lodash');
var helpers = require('../helpers');
var logger = require('../logger');

// ### new DAO(collection)
/**
 * Initializes a DAO instance using the database collection passed in so we can perform operations on it
 * @constructor
 * @param {object} collection A mongoose model
 * @example 
 * ```var Comments = mongoose.model('Comments', CommentsSchema));
    var DAO = require('../../components/DAO');
    var collection = new DAO(Comments);```
 */
function DAO(collection) {
  this.collection = collection || {}; //Set up the name of the collection we will be interacting with

  // Modify the incoming request body before it interacts with the database
  // Should be a function
  this.modifyBody = null;

  // Modify the request identifier before it interacts with the database
  // Should be a function
  this.modifyIdentifier = null;
}

// ### DAO.setCollection(collection)
/**
 * Sets a collection on the DAO instance if not already set in the constructor
 * @param {object} collection A mongoose model
 */
DAO.prototype.setCollection = function(collection) {
  this.collection = collection;
};


// ## All Operations
//  * Send a 404 status code if no items are found that match the identifier
//  * Call `handleError()` if there was an error with mongoDB

// Get a single item
DAO.prototype.findById = function(req, res, callback) {
    this.collection.findById(req.params.id).lean().exec(function (err, found) {
      if(err) { return handleError(res, err); }
      if(!found) { return res.send(404); }

      // If the function has a callback use it and if it returns a value send that value instead
      var modified;
      if(callback) { modified = callback(found); }
      if(modified) { found = modified; }
      
      return res.json(found);
    });
};

/**
 * Finds items in the database collection that match the `identifier`
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {Function} callback If an object is found it gets passed in to the callback. 
 *                             If the callback returns a value, it sends that returned value 
 *                             to the client instead of the found object
 * @return {object|array} Sends back a `200` status code with found item(s)
 */
DAO.prototype.find = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  // logInfo('find', identifier, req);
  this.collection.find(identifier).lean().exec(function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    var modified;
    if(callback) { modified = callback(found); }
    if(modified) { found = modified; }
    
    return res.status(200).json(found);
  });
};

DAO.prototype.search = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  // logInfo('find', identifier, req);
  this.collection.find({$text: {$search: identifier} }).lean().exec(function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    var modified, finalFound = found;
    // for(var idx = 0; idx < found.results.length; idx++) {
    //   finalFound = found.results[idx].obj;
    // }
    if(callback) { modified = callback(finalFound); }
    if(modified) { finalFound = modified; }
    
    return res.status(200).json(finalFound);
  });
};

// Gets some items and populates their linked documents
DAO.prototype.findAndPopulate = function(req, res, populateQuery, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('findAndPopulate', identifier, req);
  this.collection.find(identifier).populate(populateQuery).lean().exec(function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    var modified;
    if(callback) { modified = callback(found); }
    if(modified) { found = modified; }  
    return res.status(200).json(found);
  });
};

// Find items and sort by a filter
DAO.prototype.findAndSort = function(req, res, callback, sortFilter) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('findAndSort', identifier, req);
  this.collection.find(identifier).sort(sortFilter).lean().exec(function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    var modified;
    if(callback) { modified = callback(found); }
    if(modified) { found = modified; }
    
    return res.status(200).json(found);
  });
};

// ### collection.findAll(req, res, cb)
/**
* Gets all items in the collection
* @param {object} req       express request object
* @param {object} res       express response object
* @param {Function=} callback Passes all found items as paramater. 
*                              If callback returns anything it sends that returned value to the 
*                              client instead of the found items 
* @return {object|array} Sends back a `200` status code with all items in the collection
* @example 
* ```var Comments = mongoose.model('Comments', CommentsSchema));
   var DAO = require('../../components/DAO');
   var collection = new DAO(Comments);
   collection.findAll(req, res, fn(allItems){});```
*/
DAO.prototype.findAll = function(req, res, callback) {
  this.collection.find({}).lean().exec(function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // If the function has a callback use it and if it returns a value send that value instead
    var modified;
    if(callback) { modified = callback(found); }
    if(modified) { found = modified; }
    
    return res.status(200).json(found);
  });
};

// ### collection.create(req, res, cb)
/**
* Adds new items to the collection
* @param {object} req       express request object
* @param {object} res       express response object
* @param {Function=} callback If an object is found it gets passed in to the callback. 
*                               If the callback returns a value, it sends that returned value 
*                               to the client instead of the found object
* @return {object|array} Sends back a `201` status code with created item(s)
* @example 
* ```var Comments = mongoose.model('Comments', CommentsSchema));
   var DAO = require('../../components/DAO');
   var collection = new DAO(Comments);
   collection.create(req, res, fn(allCreated){});```
*/
DAO.prototype.create = function(req, res, callback) {
  this.collection.create(req.body, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(404); }

    // Since mongoose returns created items as list of params we must iterate through them
    var allFound = getArguments(arguments);
    if(callback) callback(allFound);
    return res.status(201).json(allFound);
  });
};

// ### collection.update(req, res, cb)
/**
 * Updates existing items in the collection
 * @param {object} req       express request object
 * @param {object} res       express response object
 * @param {Function=} callback If the replacement data gets passed into the callback. 
 *                              If the callback returns a value, it sends that returned value 
 *                              to the client instead of the found object
 * @return {Number} Sends back a `200` status code with number of items updated
 * @example 
 * ```var Comments = mongoose.model('Comments', CommentsSchema));
    var DAO = require('../../components/DAO');
    var collection = new DAO(Comments);
    collection.update(req, res, fn(replacementData) {});```
 */
DAO.prototype.update = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('update', identifier, req);
  this.collection.update(identifier, req.body, {multi: true}, function(err, found) {
    if (err) { return handleError(res, err); }
    if(!found) { return res.status(204).send(); }
    var allFound = getArguments(arguments);
    if(callback) { callback(req.body); }
    return res.status(200).json(allFound);
  });
};

// Updates or Upserts existing items in the collection.
DAO.prototype.upsert = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('upsert', identifier, req);
  this.collection.update(identifier, req.body, {multi: true, upsert: true, setDefaultsOnInsert: true}, function(err, found, upserted) {
    if (err) { return handleError(res, err); }
    if(!found) { return res.status(204).send(); }
    var allFound = getArguments(arguments);
    if(callback) callback(req.body);
    return res.status(201).json(allFound);
  });
};

// Updates one existing item in the collection.
DAO.prototype.updateById = function(req, res, callback) {
  if(req.body._id) { delete req.body._id; }
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
};

DAO.prototype.updateOneAndUpdate = function(req, res, callback) {
  var self = this;
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('updateOneAndUpdate', identifier, req);
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
};

DAO.prototype.createRaw = function(content) {
  this.collection.create(content, function(err, found) {
    if(err) { return console.log('createRaw error', err); }
    // Since mongoose returns created items as list of params we must iterate through them
    var allFound = getArguments(arguments);
  });
};

DAO.prototype.updateRaw = function(identifier, content) {
  this.collection.update(identifier, content, {multi: true}, function(err, updated) {});
};

DAO.prototype.findRaw = function(identifier, callback) {
  this.collection.find(identifier, function(err, found) {
    if(err) { return console.log('createRaw error', error); }
    // Since mongoose returns created items as list of params we must iterate through them
    var allFound = getArguments(arguments);
    if(callback) { callback(allFound[0]); }
  });
};

// ### collection.delete(req, res, cb, preventDeleteAll)
/**
 * Deletes items from the collection
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {Function=} callback The `identifier` is passed as a paramater
 * @param {boolean=} preventDeleteAll Determines whether the database should prevent an 
 *                                     `Identifier` of `{}` to be passed which would 
 *                                     delete all the items in the collection.
 * @return {nothing} Sends back a `204` status code
 * @example 
 * ```collection.delete(req, res, fn(identifier){}, true);```
 */
DAO.prototype.delete = function(req, res, callback, preventDeleteAll) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('delete', identifier, req);
  if(preventDeleteAll && helpers.isEmpty(identifier)) {
    return mongoErrorHandler(res, 'You cannot delete all items in this collection');
  }
  this.collection.remove(identifier, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(204); }
    if(callback) { callback(identifier); }
    return res.status(204).send();
  });
};

// Deletes a single item from the collection.
DAO.prototype.deleteById = function(req, res, callback) {
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('deleteById', identifier, req);
  this.collection.findById(identifier.id, function (err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(204); }
    found.remove(function(err) {
      if(err) { return handleError(res, err); }
      if(callback) callback();
      return res.send(204);
    });
  });
};

DAO.prototype.deleteOneAndUpdate = function(req, res, callback) {
  var self = this;
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('deleteOneAndUpdate', identifier, req);
  this.collection.findOne(identifier, function(err, found) {
    if (err) { return handleError(res, err); }
    if(!found) { return res.send(204); }
    self.collection.remove(identifier, function(err, deleted) {
      if (err) { return handleError(res, err); }
      if(!deleted) { return res.send(404); }
      if(callback) { callback(found); }
      return res.status(200).json();
    });
  });
};

DAO.prototype.deleteRaw = function(identifier) {
  this.collection.remove(identifier, function(err, response) {});
};

// Deletes items from this collections and destories their links in another collection
DAO.prototype.deleteAndUnlink = function(req, res, callback, linkField, linkModel) {
  var self = this;
  var identifier = this.getIdentifer(req, res);
  if(!identifier) { return false; }
  logInfo('deleteAndUnlink', identifier, req);
  self.model.find(identifier, function(err, found) {
    if(err) { return handleError(res, err); }
    if(!found) { return res.send(204); }

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

module.exports = DAO;


function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// Handles the request object to determine how data was sent to the server
DAO.prototype.getIdentifer = function(req, res) {
  var identifier = {};
  if(req.query && req.query.where) { //If a raw DAO query came in
    try {
      identifier = JSON.parse(req.query.where);
    } catch(e) {
      console.log('could not parse req.query.where', req.query.where);
      identifier = req.query.where;
    }
    if(identifier.searchText) {
      identifier = identifier.searchText;
    }
  } else if(req.query && req.query.searchText) {
    identifier = req.query.searchText;
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
    return mongoErrorHandler(res, 'Identifier is undefined');
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

function logInfo(method, identifier, req) {
  logger.info('DAO.' + method + '() %s ', req.originalUrl.substring(0, req.originalUrl.indexOf( "?" ) ), identifier);
};

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