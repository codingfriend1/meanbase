'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('panel', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/panel/panel.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	if(!scope.extension.data || scope.extension.data.length < 1) {
      		scope.extension.data = {};
      	}
      }
    };
  });