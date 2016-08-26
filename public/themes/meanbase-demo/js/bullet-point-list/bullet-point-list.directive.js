angular.module('meanbaseApp')
  .directive('bulletPointList', function ($rootScope, endpoints, $compile, $timeout) {
    return {
      templateUrl: require('./bullet-point-list.html'),
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {

        if(!scope.listItem.data) {
          scope.listItem.data = {
            containerClass: '',
            items: []
          };
        }

        if(!scope.listItem.data.items) {
          scope.listItem.data.items = [];
        }

        scope.bulletPoints = scope.listItem.data;


      }
    }
  });
