angular.module('meanbaseApp')
  .directive('mbGridRemove', function ($rootScope, endpoints, $timeout, api) {
    return {
      template: '<div ng-if="editMode" class="mb-remove-grid-btn"><i class="fa fa-times fa-lg"></i></div>',
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

        var list = scope.$parent.$eval(attrs.list);
        var item = scope.$parent.$eval(attrs.item);

        element.bind('click', async function() {

          $timeout(function() {
            var index = list.indexOf(item);
            if(index !== -1) {
              list.splice(index, 1)
            }
          });

        });
      }
    }

  });
