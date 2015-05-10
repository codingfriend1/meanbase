'use strict';

angular.module('meanbaseApp')
  .directive('extensionsArea', function ($rootScope) {
    return {
      templateUrl: 'components/extensions-area/extensions-area.html',
      restrict: 'A',
      link: function (scope, element, attrs) {
      	if(attrs.extensionsArea.length > 0) {
      		if(!$rootScope.page.extensions) { $rootScope.page.extensions = {}; }
      		if(!$rootScope.page.extensions[attrs.extensionsArea]) { $rootScope.page.extensions[attrs.extensionsArea] = []; }
    			scope.$watch(function() {
    				return $rootScope.page.extensions[attrs.extensionsArea];
    			}, function(newValue, oldValue) {
    				scope.extensions = newValue;
    			});
    			scope.areaName = attrs.extensionsArea;
      	}
      }
    };
  });