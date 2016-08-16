angular.module('meanbaseApp')
  .directive('chooseIcon', function ($rootScope, endpoints, $compile) {
    return {
      template: '<i ng-class="for[property].classes" ng-click="handleIconClick($event, for, property, for[property].url)"></i>',
      restrict: 'EA',
      scope: true,
      replace: true,
      link: function (scope, element, attrs) {
        scope.for = scope.$parent.$eval(attrs.for);

        if(!scope.for) { scope.for = {}; }

        function setDefaultIfEmpty() {
          if(!scope.for[attrs.property]  || _.isEmpty(scope.for[attrs.property])) {
            scope.for[attrs.property] = {
              classes: 'fa fa-pencil fa-2x erase-this'
            };
          } else if(scope.for[attrs.property].classes === '') {
            scope.for[attrs.property].classes = 'fa fa-pencil fa-2x erase-this';
          }
        }

        function removeDefault() {
          if(scope.for[attrs.property].classes === 'fa fa-pencil fa-2x erase-this') {
            scope.for[attrs.property].classes = '';
          }
        }

        if($rootScope.editMode) {
          setDefaultIfEmpty();
        }

        scope.$onRootScope('cms.editMode', function(event, value) {
          if(value) {
            setDefaultIfEmpty()
          } else {
            removeDefault();
          }
        });

        // scope.$onRootScope('cms.saveEdits', function() {
        //   removeDefault();
        // });
      }
    }
  });
