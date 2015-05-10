'use strict';

angular.module('meanbaseApp').directive('dynamicHtml', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamicHtml, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});