'use strict';

angular.module('meanbaseApp')
  .directive('listArea', function ($rootScope) {
    return {
      templateUrl: require('./list-area.jade'),
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
      	if(attrs.listArea) {
    			scope.areaName = attrs.listArea || 'list1';
          if(!$rootScope.page.lists[scope.areaName]) {
            $rootScope.page.lists[scope.areaName] = [];
          }
      	}
      }
    };
  });
