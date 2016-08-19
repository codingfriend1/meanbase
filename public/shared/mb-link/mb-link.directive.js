angular.module('meanbaseApp')
  .directive('mbLink', function ($rootScope, $timeout, $location) {
    return {
      restrict: 'A',
      template: '<a class="mb-link" ng-class="belongsTo[mbLink].classes" href="{{belongsTo[mbLink].url}}" target="{{belongsTo[mbLink].target}}" ng-transclude></a>',
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

        element.bind('click', function(event) {
          if(!$rootScope.editMode) {
            var anchorLink = scope.belongsTo[scope.mbLink];
            if(anchorLink.target) {
              window.open(anchorLink.url, anchorLink.target);
            } else {
              $location.path(anchorLink.url);
            }
          }
        });
      }
    }

  });
