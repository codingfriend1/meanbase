'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('search-form', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/search-form/search-form.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      }
    };
  });