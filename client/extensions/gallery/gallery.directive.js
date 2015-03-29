'use strict';

angular.module('extensions')
  .directive('gallery', function () {
    return {
      templateUrl: 'extensions/gallery/gallery.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	console.log('gallery');
      }
    };
  });