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

        if(scope.belongsTo[scope.property].classes === 'fa fa-pencil fa-lg erase-this') {
          scope.belongsTo[scope.property].classes = '';
        }

        if(!$rootScope.isLoggedIn) { return false; }

        function setDefaultIfEmpty() {
          if(!scope.belongsTo[attrs.property]  || _.isEmpty(scope.belongsTo[attrs.property])) {
            scope.belongsTo[attrs.property] = {
              classes: 'fa fa-pencil fa-lg erase-this'
            };
          } else if(scope.belongsTo[attrs.property].classes === '') {
            scope.belongsTo[attrs.property].classes = 'fa fa-pencil fa-lg erase-this';
          }
        }

        function removeDefault() {
          if(scope.belongsTo[attrs.property].classes === 'fa fa-pencil fa-lg erase-this') {
            scope.belongsTo[attrs.property].classes = '';
          }
        }

        if($rootScope.editMode) {
          setDefaultIfEmpty();
        }

        scope.$onRootScope('cms.editMode', function(event, value) {
          if(value) {
            scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);
            setDefaultIfEmpty();
          } else {
            removeDefault();
          }
        });

        scope.$onRootScope('cms.saveListItem', function(event, value) {
          $timeout(function() {
            scope.belongsTo = scope.$parent.$eval(attrs.belongsTo);
            setDefaultIfEmpty();
          });
        });

        // scope.$onRootScope('cms.saveEdits', function() {
        //   removeDefault();
        // });
      }
    }
  });
