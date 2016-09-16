angular.module('meanbaseApp')
  .directive('mbEditLink', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<div class="mb-edit-link-btn" ng-if="$root.editMode"><i class="fa fa-link disable-click"></i></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        if(!$rootScope.isLoggedIn) { return false }

        element.bind('click', function(event) {
          scope.belongsTo = scope.$eval(attrs.belongsTo)
          if(!scope.belongsTo) { scope.belongsTo = {} }
          if(!scope.belongsTo[attrs.property]) { scope.belongsTo[attrs.property] = {} }
          scope.openLinkModal(scope.belongsTo, attrs.property)
        })
      }
    }

  })
