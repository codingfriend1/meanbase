
angular.module('meanbaseApp')
  .directive('initList', function ($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: {
        initList: '='
      },
      link: function (scope, element, attrs) {
        function checkForEmpty() {
          if(!scope.initList) {
            scope.initList = {
              items: []
            };
          }

          if(!scope.initList.items) {
            scope.initList.items = [];
          }
        }

        checkForEmpty()

        scope.$onRootScope('cms.updateView', function() {
          checkForEmpty()
        })
      }
    };
  });
