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
          if(returnObject[specialProperty] === undefined) {
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
        return Object.keys(obj).length === 0;
      }
    };

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

    // Draggable elements have group and position properties to identify location on the page,
    // when they are dragged around this function updates those properties
    // so when a new user requests the page, they see everything in it's correct place.
    // draggableGroups is an object with properties representing the group name and having an array of elements that are in that group
    // They are in that format because we ran helpers.arrayToObjectWithArray so they would be easier to work with
    this.updatePositionData = function(draggableGroupsObject) {
      var updatedDraggableObject = [];
      for(var group in draggableGroupsObject) {
        if (draggableGroupsObject.hasOwnProperty(group)) {
          for(var i = 0; i < draggableGroupsObject[group].length; i++) {
            draggableGroupsObject[group][i].group = group;
            draggableGroupsObject[group][i].position = i;
            updatedDraggableObject.push(draggableGroupsObject[group][i]);
          }
        } 
      }
      console.log("updatedDraggableObject", updatedDraggableObject);
      return updatedDraggableObject;
    };

    this.updatePositionDataAsObject = function(draggableGroupsObject) {
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
