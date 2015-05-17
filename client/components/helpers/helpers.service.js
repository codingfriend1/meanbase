'use strict';

angular.module('meanbaseApp')
  .service('helpers', function ($rootScope) {
    this.arrayToObjectWithArray = function(array, itemToBecomeProperty) {
      if(!array || !itemToBecomeProperty) { return array; }
      if(!Array.isArray(array)) { array = [array]; }

      var returnObject = {};
      for (var ii = 0; ii < array.length; ii++) {
        var specialProperty = array[ii][itemToBecomeProperty];
        if(specialProperty) {
          if(returnObject[specialProperty] == undefined) {
            returnObject[specialProperty] = [];
          }
          returnObject[specialProperty].push(array[ii]);
        }
        
      } //for

      return returnObject;
    };

    this.arrayToObjectWithObject = function(array, itemToBecomeProperty) {
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

    this.objectToArray = function(data) {
      if(!data || data === null || typeof data !== 'object') { return data; }
      var returnArray = [];
      for (var property in data) {
        if (data.hasOwnProperty(property)) {
          returnArray = returnArray.concat(data[property]);
        }
      }
      return returnArray;
    };

    this.loopThroughPageExtensions = function(fn) {
      for (var property in $rootScope.page.extensions) {
        if ($rootScope.page.extensions.hasOwnProperty(property)) {
          for(var idx = 0; idx < $rootScope.page.extensions[property].length; idx++) {
            var currentExtension = $rootScope.page.extensions[property][idx];
            fn(currentExtension);
          }
        }
      }
    };

    this.isEmpty = function (obj) {
      if(!obj) return true;
      if(Array.isArray(obj)) {
        return obj.length < 1;
      } else if(Object.prototype.toString.call(obj) === "[object Object]") {
        console.log('Object.prototype.toString.call(obj)', Object.prototype.toString.call(obj));
        return Object.keys(obj).length === 0;
      }
    };


  });
