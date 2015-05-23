'use strict';

angular.module('meanbaseApp')
  .directive('validate', function () {
    return {
      templateUrl: 'components/validate/validate.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	// element.
      }
    };
  });