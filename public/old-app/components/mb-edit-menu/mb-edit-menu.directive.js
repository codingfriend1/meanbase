angular.module('meanbaseApp')
  .directive('mbEditMenu', function ($rootScope, endpoints, $timeout, editMenuModal) {
    return {
      template: '<div class="mb-edit-menu-btn" ng-if="$root.editMode"><i class="fa fa-pencil disable-click"></i></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.item = scope.$eval(attrs.item)

        element.bind('click', function(event) {
          scope.item = scope.$eval(attrs.item)
          editMenuModal.open(event, scope.item)
        })
      }
    }

  })
