// This service contains various helper functions used in common tasks all around the CMS
'use strict';

angular.module('meanbaseApp')
  .service('helpers', function ($rootScope) {

    var self = this;
    // ### Convert Array to Object with Array
    // helpers.arrayToObjectWithArray() receives an array of objects and converts them into and object of arrays with the property name being the value of the string property that was passed into `itemToBecomeProperty`
    this.arrayToObjectWithArray = function(array, itemToBecomeProperty) {
      if(!array || !itemToBecomeProperty) { return array; }
      if(!Array.isArray(array)) { array = [array]; }

      var returnObject = {};
      for (var ii = 0; ii < array.length; ii++) {

        // Get the value of the property in `itemToBecomeProperty`
        var specialProperty = array[ii][itemToBecomeProperty];
        if(specialProperty) {

          // If a property on the overall object with that value doesn't exist create it as an array
          if(returnObject[specialProperty] === undefined) {
            returnObject[specialProperty] = [];
          }

          // If the array item has it's `itemToBecomeProperty` value as an object property push this object into that property array
          returnObject[specialProperty].push(array[ii]);
        }
        
      } //for

      return returnObject;
    };


    // ### Convert Array to Object
    // helpers.arrayToObjectWithObject() receives an array of objects and converts it into an object containing objects using the property name itemToBecomeProperty. For example let say we pass in this array and the itemToBecomeProperty is `contentName`: 

    // **Before**
    // ```javascript
    // [
    //    {"contentName":"shared","type":"panel"},
    //    {"contentName":"yes","type":"panel"},
    //    {"contentName":"yepper","type":"search-form"}
    // ]```

    // **After**
    // ```javascript
    // {
    //    "shared":{"contentName":"shared","type":"panel"},
    //    "yes":{"contentName":"yes","type":"panel"},
    //    "yepper":{"contentName":"yepper","type":"search-form"}
    //}```

    // We want to use this for speed increases throughout the app so we can refer to an object by a property name instead of having to do a loop anytime we need acceess to these objects

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

    this.arrayToObjectWithValue = function(array, itemToBecomeProperty, itemToBecomeValue) {
      if(!array || !itemToBecomeProperty) { return array; }
      if( !Array.isArray(array) ) { array = [array]; }

      var returnObject = {};
      for (var ii = 0; ii < array.length; ii++) {
        var specialProperty = array[ii][itemToBecomeProperty];
        if(specialProperty) {
          returnObject[specialProperty] = array[ii].itemToBecomeValue;
        }
      } //for
      return returnObject;
    };

    // ### Convert Object to Array
    // helpers.objectToArray() accepts an object and loops through it's properties and pushes their values into an array which is returned
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

    // ### Loop through page extensions
    // helpers.loopThroughPageExtensions() does a for loop through all the extensions on the current page and runs a callback function on each iteration passing in the current extension being iterated on
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

    // ### Check if object or array is empty
    // helpers.isEmpty receives an object or array and returns true if it doesn't exist or has zero length or properties
    this.isEmpty = function (obj) {
      if(!obj) return true;
      if(Array.isArray(obj)) {
        return obj.length < 1;
      } else if(Object.prototype.toString.call(obj) === "[object Object]") {
        return Object.keys(obj).length === 0;
      }
    };

    this.removeEmptyProperties = function(map) {
       for(var key in map) {
          if (map.hasOwnProperty(key)) {
            if(self.isEmpty(map[key])) {
             delete map[key];
            }
          }
       }
    }

    // ### Generate Select Drop Down Options
    // helpers.generateSelectOptions() receives an array of strings which it converts into an array of objects, each containing a label and value property. It also allows you to add functions to filter what the values of those labels and values will be. This is currently only used on the CMS comments controller to help generate the list of pages that currently have comments on them.
    this.generateSelectOptions = function(model, labelFilter, valueFilter) {
      var modifiedModel = [];
      for (var i = 0; i < model.length; i++) {
        modifiedModel[i] = {};
        if(model[i] === 'all' || model[i].label === 'all') {
          modifiedModel[i] = {label: 'all', value: ''};
        } else {
          modifiedModel[i] = {label: model[i], value: model[i]};
          if(labelFilter) {
            modifiedModel[i].label = labelFilter(model[i]);
          }
          if(valueFilter) {
            modifiedModel[i].value = valueFilter(model[i]);
          }
        }
      };

      return modifiedModel;
    };

    // ###Update Position Data
    // Draggable elements have group and position properties that identify their location on the page so the server knows which places to load the content when the page first loads. Before the page is saved or items are deleted or added we need to update those position properties.

    // `draggableGroups` is an object with properties representing the group name and having an array of objects that are in that group
    // They are in that format because we ran helpers.arrayToObjectWithArray so they would be easier to work with
    this.updatePositionData = function(draggableGroupsObject) {
      for(var group in draggableGroupsObject) {
        if (draggableGroupsObject.hasOwnProperty(group)) {
          for(var i = 0; i < draggableGroupsObject[group].length; i++) {
            draggableGroupsObject[group][i].group = group;
            draggableGroupsObject[group][i].position = i;
          }
        } 
      }
      return draggableGroupsObject;
    };

  });
