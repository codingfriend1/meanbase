'use strict';

angular.module('meanbaseApp')
  .directive('extensionsArea', function ($rootScope) {
    return {
      templateUrl: require('./extensions-area.jade'),
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
      	if(attrs.extensionsArea) {
          scope.removeThisExtension = scope.$parent.removeThisExtension;
    			scope.areaName = attrs.extensionsArea || 'extensions-1';
          if(!$rootScope.page.extensions[scope.areaName]) {
            $rootScope.page.extensions[scope.areaName] = [];
          }
      	}
      }
    };
  });
