angular.module('meanbaseApp')
  .directive('mbNew', function ($rootScope, endpoints, $timeout) {
    return {
      // template: '<ng-transclude></ng-transclude>',
      restrict: 'A',
      // transclude: true,
      scope: {
        mbNew: '=',
        mbModel: '='
      },
      link: function (scope, element, attrs) {
        if(!$rootScope.isLoggedIn) { return false; }
        
        if(!scope.mbNew) {
          scope.mbNew = [];
        }

        if(!scope.mbModel) {
          scope.mbModel = {};
        }

        element.bind('click', function(event) {
          $rootScope.$emit('cms.saveListItem');
          $timeout(function() {
            $timeout(function() {
              scope.mbNew.push(_.cloneDeep(scope.mbModel));
              scope.mbModel = {};

            });
          });
        });
      }
    }
  });
