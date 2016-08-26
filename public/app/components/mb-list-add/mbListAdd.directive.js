angular.module('meanbaseApp')
  .directive('mbListAdd', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div class="add-to-list-btn" ng-if="$root.editMode"><i class="fa fa-plus fa-lg"></i> <span>Add {{label}}</span></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        scope.list = scope.$eval(attrs.list);
        scope.item = scope.$eval(attrs.item);
        scope.label = attrs.label;

        if(!$rootScope.isLoggedIn) { return false; }

        if(!scope.label) { scope.label = 'item'; }

        if(!scope.list) {
          scope.list = [];
        }

        if(!scope.item) {
          scope.item = {};
        }

        element.bind('click', function(event) {
          scope.item = scope.$eval(attrs.item);
          scope.list = scope.$eval(attrs.list);
          scope.list.push(angular.copy(scope.item));
          $rootScope.$emit('cms.saveListItem');
          scope.item = {};
        });
      }
    }

  });
