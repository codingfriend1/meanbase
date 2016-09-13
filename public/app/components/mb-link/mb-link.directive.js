angular.module('meanbaseApp')
  .directive('mbLink', function ($rootScope, $timeout, $location, Auth) {
    return {
      restrict: 'A',
      template: '<a class="mb-link" ng-class="belongsTo[mbLink].classes" target="{{belongsTo[mbLink].target}}" ng-transclude></a>',
      transclude: true,
      replace: true,
      scope: {
        mbLink: "@",
        belongsTo: "="
      },
      link: function (scope, element, attrs) {
        scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);
        scope.mbLink = attrs.mbLink;
        if(!scope.belongsTo) { scope.belongsTo = {}; }
        if(!scope.belongsTo[scope.mbLink]) { scope.belongsTo[scope.mbLink] = {}; }

        element.bind('click', _.debounce(function(event) {
          if(!$rootScope.editMode) {
            var anchorLink = scope.belongsTo[scope.mbLink];
            if(anchorLink.target) {
              window.open(anchorLink.url, anchorLink.target);
            } else {
              $location.path(anchorLink.url);
            }
          } else {
            event.preventDefault()
          }
        }, 30))

        if(!Auth.isLoggedIn()) { return false }

        scope.$onRootScope('cms.updateView', function(event, shouldSave) {
          scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);
          if(!scope.belongsTo) { scope.belongsTo = {}; }
          if(!scope.belongsTo[scope.mbLink]) { scope.belongsTo[scope.mbLink] = {}; }
        })
      }
    }

  });
