angular.module('meanbaseApp').directive('mbDynamicHtml', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.mbDynamicHtml, function(html) {
        element.prepend(html);
        $compile(element.contents())(scope);
      });
    }
  };
});
