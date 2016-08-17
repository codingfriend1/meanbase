angular.module('meanbaseApp')
  .directive('mbLink', function ($rootScope, endpoints, $timeout) {
    return {
      restrict: 'A',
      template: '<a class="mb-link" ng-class="belongsTo[mbLink].classes" ng-href="belongsTo[mbLink].url" target="{{belongsTo[mbLink].target}}" ng-transclude></a>',
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
      }
    }

  });
