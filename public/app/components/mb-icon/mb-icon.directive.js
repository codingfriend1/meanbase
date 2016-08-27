angular.module('meanbaseApp')
  .directive('mbIcon', function ($rootScope, endpoints, $compile) {
    return {
      template: '<i ng-class="belongsTo[property].classes" ng-click="handleIconClick($event, belongsTo, property, belongsTo[property].url)"></i>',
      restrict: 'E',
      scope: true,
      replace: true,
      link: function (scope, element, attrs) {
        scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);

        if(!scope.belongsTo) { scope.belongsTo = {}; }
        scope.property = attrs.property;

        if(scope.belongsTo[scope.property].classes === 'fa fa-pencil fa-lg erase-this') {
          scope.belongsTo[scope.property].classes = '';
        }
      }
    }
  });
