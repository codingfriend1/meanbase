angular.module('meanbaseApp')
  .directive('mbExtensionEdit', function ($rootScope, endpoints, $timeout, $modal) {
    return {
      template: '<div ng-if="editMode" class="mb-edit-extension-btn"><i class="fa fa-exchange"></i></div>',
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false; }

        var item = scope.$parent.$eval(attrs.item);

        element.bind('click', function() {
          console.log('click modal');
          scope.openEditExtensionModal(item)
        });

        // scope.$on('$destroy', function() {
        //   element.unbind('click')
        // })
      }
    }

  });
