angular.module("meanbaseApp").directive('mbEdit', function ($sanitize, $rootScope, $timeout) {

    function toInnerText(value) {
      var tempEl = document.createElement('div'),
          text;
      tempEl.innerHTML = value;
      text = tempEl.textContent || '';
      return text.trim();
    }

    return {
      require: 'ngModel',
      restrict: 'AE',
      scope: { bindOptions: '=' },
      link: function(scope, element, iAttrs, ngModel) {

        angular.element(element).addClass('mb-edit');

        // Global MediumEditor
        ngModel.editor = new MediumEditor(element, scope.bindOptions);

        ngModel.$render = function() {
          element.html(ngModel.$viewValue || "");
          var placeholder = ngModel.editor.getExtensionByName('placeholder');
          if (placeholder) {
            placeholder.updatePlaceholder(element[0]);
          }
        };

        ngModel.$isEmpty = function(value) {
          if (/[<>]/.test(value)) {
            return toInnerText(value).length === 0;
          } else if (value) {
            return value.length === 0;
          } else {
            return true;
          }
        };

        ngModel.editor.subscribe('editableInput', function (event, editable) {
          ngModel.$setViewValue(editable.innerHTML.trim());
        });

        scope.$watch('bindOptions', function(bindOptions) {
          if(!$rootScope.editMode) {
            ngModel.editor.destroy();
          } else {
            ngModel.editor.init(element, bindOptions);
          }
        });

        scope.$on('$destroy', function() {
          ngModel.editor.destroy();
        });

        scope.$onRootScope('cms.editMode', function(event, value) {
          if(value) {
            ngModel.editor.setup();
          } else {
            ngModel.$setViewValue(ngModel.editor.getContent());
            ngModel.editor.destroy();
            ngModel.$render();
          }
        });
      }
    };

  });
