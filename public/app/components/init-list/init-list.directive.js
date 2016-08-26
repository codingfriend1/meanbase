'use strict';

angular.module('meanbaseApp')
  .directive('initList', function ($rootScope) {
    return {
      restrict: 'A',
      scope: {
        initList: '='
      },
      link: function (scope, element, attrs) {
        if(!scope.initList) {
          scope.initList = {
            items: []
          };
        }

        if(!scope.initList.items) {
          scope.initList.items = [];
        }
      }
    };
  });
