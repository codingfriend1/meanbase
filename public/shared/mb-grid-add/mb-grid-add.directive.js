angular.module('meanbaseApp')
  .directive('mbGridAdd', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div ng-if="$root.editMode" class="add-to-grid-box col-sm-4 col-xs-6"><i class="fa fa-plus fa-lg"></i></div>',
      restrict: 'EA',
      scope: {
        list: '=',
        item: '='
      },
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

        if(!scope.list) {
          scope.list = [];
        }

        if(!scope.item || _.isEmpty(scope.item)) {
          scope.item = { x:0, y:0, width:6, height:1 }
        }

        element.bind('click', function(event) {
          $timeout(function() {
            scope.list.push(angular.copy(scope.item));
          });

        });
      }
    }

  });
