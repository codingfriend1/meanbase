angular.module('meanbaseApp')
  .directive('mbAddMenuItem', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<a><span ng-if="$root.editMode"><i class="fa fa-plus"> </i> <span> Add Link</span></a>',
      restrict: 'A',
      link: function (scope, element, attrs) {

        element.bind('click', function(event) {
          if(!$rootScope.menus[attrs.mbAddMenuItem]) {
            $rootScope.menus[attrs.mbAddMenuItem] = []
          }
          scope.addMenuItem($rootScope.menus, attrs.mbAddMenuItem)
        });
      }
    }

  });
