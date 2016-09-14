angular.module('meanbaseApp').directive('mbDynamicHtml', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.prepend(attrs.mbDynamicHtml);
      $compile(element.contents())(scope);
    }
  };
});
