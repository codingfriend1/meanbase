var config = require('../../config/environment');
var app = config.app;
var fs = require('fs');
var Finder = require('fs-finder');
var Themes = require('../../api/themes/themes.model');
var Promise = require('promise');

exports.arrayToObjectWithArray = function(array, itemToBecomeProperty) {
  if(!array || !itemToBecomeProperty) { return array; }
  if(!Array.isArray(array)) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      if(returnObject[specialProperty] === undefined) {
        returnObject[specialProperty] = [];
      }
      returnObject[specialProperty].push(array[ii]);
    }
    
  } //for

  return returnObject;
};

exports.arrayToObjectWithObject = function(array, itemToBecomeProperty) {
  if(!array || !itemToBecomeProperty) { return array; }
  if( !Array.isArray(array) ) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      returnObject[specialProperty] = array[ii];
    }
  } //for
  return returnObject;
};

exports.objectToArray = function(data) {
  if(!data || data === null || typeof data !== 'object') { return data; }
  var returnArray = [];
  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      returnArray = returnArray.concat(data[property]);
    }
  }
  return returnArray;
};

exports.arrayToObjectWithValue = function(array, itemToBecomeProperty, itemToBecomeValue) {
  if(!array || !itemToBecomeProperty) { return array; }
  if( !Array.isArray(array) ) { array = [array]; }

  var returnObject = {};
  for (var ii = 0; ii < array.length; ii++) {
    var specialProperty = array[ii][itemToBecomeProperty];
    if(specialProperty) {
      returnObject[specialProperty] = array[ii][itemToBecomeValue];
    }
  } //for
  return returnObject;
};

exports.isEmpty = function (obj) {
  if(!obj) return true;
  if(Array.isArray(obj)) {
    return obj.length < 1;
  } else if(Object.prototype.toString.call(obj) === "[object Object]") {
    return Object.keys(obj).length === 0;
  }
};

exports.containsUndefined = function(data) {
  return /(?!\B"[^"]*)undefined(?![^"]*"\B)/.test(data);
};

exports.asyncLoop = this.asyncLoop = function(iterations, func) {
  var loopPromise = new Promise(function (resolve, reject) {
    var index = 0;
    var done = false;
    var reason;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                resolve();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function(reason) {
          done = true;
          reject(reason);
        }
    };
    loop.next();
  });
  
  return loopPromise;
};
