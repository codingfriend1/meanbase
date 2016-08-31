angular.module('meanbaseApp')
  .directive('chooseIcon', function ($rootScope, endpoints, $compile, $timeout) {
    return {
      template: '<i ng-class="belongsTo[property].classes" ng-click="handleIconClick($event, belongsTo, property, belongsTo[property].url)"></i>',
      restrict: 'EA',
      scope: true,
      replace: true,
      link: function (scope, element, attrs) {
        scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);

        if(!scope.belongsTo) { scope.belongsTo = {}; }
        scope.property = attrs.property;

        if(!scope.belongsTo[scope.property]) {
          scope.belongsTo[scope.property] = {};
        }

        if(scope.belongsTo[scope.property].classes === 'fa fa-pencil fa-lg example') {
          scope.belongsTo[scope.property].classes = '';
        }

        if(!$rootScope.isLoggedIn) { return false; }

        function setDefaultIfEmpty() {
          if(!scope.belongsTo[attrs.property]  || _.isEmpty(scope.belongsTo[attrs.property])) {
            scope.belongsTo[attrs.property] = {
              classes: 'fa fa-pencil fa-lg example'
            };
          } else if(scope.belongsTo[attrs.property].classes === '') {
            scope.belongsTo[attrs.property].classes = 'fa fa-pencil fa-lg example';
          }
        }

        function removeDefault() {
          if(scope.belongsTo[attrs.property].classes === 'fa fa-pencil fa-lg example') {
            scope.belongsTo[attrs.property].classes = '';
          }
        }

        if($rootScope.editMode) {
          setDefaultIfEmpty();
        }

        scope.$onRootScope('cms.updateView', function(event, value) {
          $timeout(function() {
            scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);
            if(!$rootScope.editMode) {
              removeDefault()
            } else {
              setDefaultIfEmpty()
            }
          });
        });

        // scope.$onRootScope('cms.saveEdits', function() {
        //   removeDefault();
        // });
      }
    }
  });
