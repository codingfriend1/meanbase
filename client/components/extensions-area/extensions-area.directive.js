'use strict';

angular.module('meanbaseApp')
  .directive('extensionsArea', function ($rootScope) {
    return {
      templateUrl: 'components/extensions-area/extensions-area.html',
      restrict: 'A',
      scope: {},
      link: function (scope, element, attrs) {
      	if(attrs.extensionsArea.length > 0) {

          scope.removeThisExtension = scope.$parent.removeThisExtension;
          scope.$watch(function() { return $rootScope.editMode }, function(newValue, oldValue) {
            scope.editMode = newValue;
          });

          scope.$watch(function() { return $rootScope.sortableExtensions }, function(newValue, oldValue) {
            scope.sortableExtensions = newValue;
          });

      		if(!$rootScope.page.extensions) { $rootScope.page.extensions = {}; }
      		if(!$rootScope.page.extensions[attrs.extensionsArea]) { $rootScope.page.extensions[attrs.extensionsArea] = []; }
    			scope.$watch(function() {
    				return $rootScope.page.extensions[attrs.extensionsArea];
    			}, function(newValue, oldValue) {
    				scope.extensionsInArea = newValue;
    			});
    			scope.areaName = attrs.extensionsArea;
      	}
      }
    };
  });