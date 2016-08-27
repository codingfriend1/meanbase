angular.module('meanbaseApp')
  .directive('textColumns', function ($rootScope, endpoints, $compile, $timeout) {
    return {
      templateUrl: require('./text-columns-list.html'),
      restrict: 'EA',
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

        scope.textColumns = scope.listItem.data;


      }
    }
  });
