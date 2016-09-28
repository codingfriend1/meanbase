angular.module("meanbaseApp").directive('mbText', function ($sanitize, $rootScope, $timeout, $compile, Auth, mbTextConfig) {

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
      scope: { single: '@' },
      link: function(scope, element, iAttrs, ngModel) {

        let single = false
        if(scope.single && scope.single.toLowerCase() === 'true') {
          single = true
        }

        let options = single? mbTextConfig.singleline: mbTextConfig.multiline

        let syncDelay = 600

        angular.element(element).addClass('mb-edit')
        // .addClass('ignore-draggable')

        // Global MediumEditor
        ngModel.editor = new MediumEditor(element, options)
        if(options && !options.disableReturn) {
          $(element).mediumInsert({
            editor: ngModel.editor,
            addons: {
              images: {
                preview: false
              }
            }
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
            ngModel.editor.destroy()
          })
          return false
        }

        let isSetup = false
        $timeout(function() {
          ngModel.editor.setup()
          ngModel.editor.subscribe('editableInput', _.debounce(function (event, editable) {
            ngModel.$setViewValue(ngModel.editor.getContent())
            $rootScope.$emit('cms.elementsChanged')
          }, syncDelay))
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

        // scope.$watch('bindOptions', function(bindOptions) {
        //   if(!$rootScope.editMode) {
        //     ngModel.editor.destroy()
        //   } else {
        //     ngModel.editor.init(element, bindOptions)
        //   }
        // })

        ngModel.editor.init(element, options)

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
                  $rootScope.$emit('cms.elementsChanged')
                }, syncDelay))
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
