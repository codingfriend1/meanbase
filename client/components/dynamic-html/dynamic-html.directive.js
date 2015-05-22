'use strict';

angular.module('meanbaseApp').directive('dynamicHtml', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(attrs.dynamicHtml, function(html) {
        element.prepend(html);
        $compile(element.contents())(scope);
      });
    }
  };
});