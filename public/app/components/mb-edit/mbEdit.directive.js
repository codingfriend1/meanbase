angular.module("meanbaseApp").directive('mbEdit', function ($sanitize, $rootScope, $timeout, $compile, Auth) {

    function toInnerText(value) {
      var tempEl = document.createElement('div'),
          text
      tempEl.innerHTML = value
      text = tempEl.textContent || ''
      return text.trim()
    }

    return {
      require: 'ngModel',
      restrict: 'AE',
      // template: '<div></div>',
      scope: { bindOptions: '=' },
      link: function(scope, element, iAttrs, ngModel) {

        angular.element(element).addClass('mb-edit')

        // Global MediumEditor
        ngModel.editor = new MediumEditor(element, scope.bindOptions)
        if(scope.bindOptions && !scope.bindOptions.disableReturn) {
          $(element).mediumInsert({
            editor: ngModel.editor
          })
        }

        ngModel.$render = function() {
          element.html(ngModel.$viewValue || "")
          $compile(element.contents())(scope.$parent)
          var placeholder = ngModel.editor.getExtensionByName('placeholder')
          if (placeholder) {
            placeholder.updatePlaceholder(element[0])
          }
        }

        if(!Auth.isLoggedIn()) {
          $timeout(function() {
            ngModel.$render()
            console.log('rendering');
            ngModel.editor.destroy()
          })
          return false
        }

        let isSetup = false
        $timeout(function() {
          ngModel.editor.setup()
          ngModel.editor.subscribe('editableInput', _.debounce(function (event, editable) {
            ngModel.$setViewValue(ngModel.editor.getContent())
          }, 200))
          isSetup = true
        });


        scope.$onRootScope('recompile-editor', function() {
          ngModel.$setViewValue(ngModel.editor.getContent())
          ngModel.$render()
        })

        ngModel.$isEmpty = function(value) {
          if (/[<>]/.test(value)) {
            return toInnerText(value).length === 0
          } else if (value) {
            return value.length === 0
          } else {
            return true
          }
        }

        scope.$watch('bindOptions', function(bindOptions) {
          if(!$rootScope.editMode) {
            ngModel.editor.destroy()
          } else {
            ngModel.editor.init(element, bindOptions)
          }
        })

        scope.$on('$destroy', function() {
          ngModel.editor.destroy()
        })
        
        scope.$onRootScope('cms.updateView', function(event, shouldSave) {
          if(shouldSave) {
            ngModel.$setViewValue(ngModel.editor.getContent())
          }
          ngModel.$render()
        })


        scope.$onRootScope('cms.editMode', function(event, value) {
            if($rootScope.editMode && !isSetup) {
              $timeout(function() {
                ngModel.editor.setup()
                ngModel.editor.subscribe('editableInput', _.debounce(function (event, editable) {
                  ngModel.$setViewValue(ngModel.editor.getContent())
                }, 200))
                isSetup = true
              })
            } else if(!$rootScope.editMode) {
              ngModel.editor.unsubscribe('editableInput')
              ngModel.$setViewValue(ngModel.editor.getContent())
              ngModel.$render()
              ngModel.editor.destroy()
              isSetup = false
            }
        })
      }
    }

  })
