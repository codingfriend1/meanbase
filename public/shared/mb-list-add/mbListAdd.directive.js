angular.module('meanbaseApp')
  .directive('mbListAdd', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div class="add-to-list-btn" ng-if="$root.editMode"><i class="fa fa-plus fa-lg"></i> <span>Add {{label}}</span></div>',
      restrict: 'EA',
      scope: {
        list: '=',
        item: '=',
        label: '@'
      },
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

        if(!scope.label) { scope.label = 'item'; }

        if(!scope.list) {
          scope.list = [];
        }

        if(!scope.item) {
          scope.item = {};
        }

        element.bind('click', function(event) {
          scope.list.push(angular.copy(scope.item));
          $rootScope.$emit('cms.saveListItem');
          scope.item = {};
        });
      }
    }

  });
