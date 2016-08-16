angular.module('meanbaseApp')
  .directive('pageList', function ($rootScope, endpoints, $timeout) {
    return {
      template: '<ng-transclude></ng-transclude>',
      restrict: 'E',
      transclude: true,
      scope: true,
      link: function (scope, element, attrs) {
        if(!scope.pageList) {
          scope.pageList = [];
        }

        var ngRepeatEl = element.find('[ng-repeat]');
        console.log("ngRepeatEl", ngRepeatEl);
      }
    }
  });
