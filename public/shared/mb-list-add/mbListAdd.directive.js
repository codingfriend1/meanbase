angular.module('meanbaseApp')
  .directive('mbListAdd', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div class="add-to-list-btn"><i class="fa fa-plus fa-lg"></i></div>',
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

        if(!scope.item) {
          scope.item = {};
        }

        element.bind('click', function(event) {
          $rootScope.$emit('cms.saveListItem');
          $timeout(function() {
            $timeout(function() {
              scope.list.push(_.cloneDeep(scope.item));
              scope.item = {};

            });
          });
        });
      }
    }

  });
