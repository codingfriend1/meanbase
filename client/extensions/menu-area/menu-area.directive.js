'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('menuArea', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/menu-area/menu-area.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      }
    };
  });