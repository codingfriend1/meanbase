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
          if(!scope.for[scope.property]  || _.isEmpty(scope.for[scope.property])) {
            scope.for[scope.property] = {
              classes: 'fa fa-pencil fa-3x default-erase-this'
            };
          } else if(scope.for[scope.property].classes === '') {
            scope.for[scope.property].classes = 'fa fa-pencil fa-3x erase-this';
          }
        }

        function removeDefault() {
          if(scope.for[scope.property].classes === 'fa fa-pencil fa-3x erase-this') {
            scope.for[scope.property].classes = '';
          }
        }

        if($rootScope.editMode) {
          setDefaultIfEmpty();
        }

        scope.$onRootScope('cms.editMode', function(event, value) {
          setDefaultIfEmpty()
        });

        // When the user saves their changes, update the ng-bind-html with the trymbowyg html
        scope.$onRootScope('cms.saveEdits', function() {
          removeDefault();
        });
      }
    }
  });
