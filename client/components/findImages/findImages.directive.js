'use strict';

angular.module('meanbaseApp')
  .directive('findImages', function () {
    return {
      templateUrl: 'components/findImages/findImages.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	element.bind('click', function() {
      		alert('hi');
      	});
      }
    };
  });