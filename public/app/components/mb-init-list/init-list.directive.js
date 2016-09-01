
angular.module('meanbaseApp')
  .directive('mbInitList', function ($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: {
        mbInitList: '='
      },
      link: function (scope, element, attrs) {
        function checkForEmpty() {
          if(!scope.mbInitList) {
            scope.mbInitList = {
              items: []
            };
          }

          if(!scope.mbInitList.items) {
            scope.mbInitList.items = [];
          }
        }

        checkForEmpty()

        scope.$onRootScope('cms.updateView', function() {
          checkForEmpty()
        })
      }
    };
  });
