angular.module('meanbaseApp')
  .directive('pageList', function ($rootScope, endpoints, $timeout) {
    return {
      // template: '<ng-transclude></ng-transclude>',
      restrict: 'AE',
      transclude: true,
      scope: {
        list: '='
      },
      link: function (scope, element, attrs, ctrl, transclude) {
        transclude(scope, function(clone, scope) {
          clone.attr('ng-repeat', 'item in list');
          element.append(clone);
        });
      }
    }
  });
