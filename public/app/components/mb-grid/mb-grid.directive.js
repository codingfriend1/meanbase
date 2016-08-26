angular.module('meanbaseApp')
  .directive('mbGrid', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div ng-if="$root.editMode" class="add-to-grid-btn"><i class="fa fa-plus fa-lg"></i></div>',
      restrict: 'EA',
      scope: {
        list: '=',
        options: '='
      },
      link: function (scope, element, attrs) {

        var gridstack = element.gridstack(scope.options).data('gridstack');

        if(!$rootScope.isLoggedIn) { return false; }

      }
    }

  });
