'use strict';

angular.module('meanbaseApp')
  .directive('mbListArea', function ($rootScope) {
    return {
      templateUrl: require('./mb-list-area.jade'),
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
      	if(attrs.mbListArea) {
    			scope.areaName = attrs.mbListArea || 'list1';
          if(!$rootScope.page.lists[scope.areaName]) {
            $rootScope.page.lists[scope.areaName] = [];
          }
      	}
      }
    };
  });
