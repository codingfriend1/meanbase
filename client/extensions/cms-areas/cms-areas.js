'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('cmsAreas', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/cms-areas/cms-areas.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope = scope.$parent;
      	console.log('scope', scope);
      }
    };
  });