angular.module('meanbaseApp')
  .directive('addMenuItem', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<span ng-if="$root.editMode"><i class="fa fa-plus"> </i> <span> Add Link</span></div>',
      restrict: 'A',
      link: function (scope, element, attrs) {

        element.bind('click', function(event) {
          if(!$rootScope.menus[attrs.addMenuItem]) {
            $rootScope.menus[attrs.addMenuItem] = []
          }
          scope.addMenuItem($rootScope.menus, attrs.addMenuItem)
        });
      }
    }

  });
