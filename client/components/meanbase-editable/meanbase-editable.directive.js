// Handles starting up and shutting down the inline text editors and syncing up changes with the model when edits are saved

'use strict';

angular.module('meanbaseApp')
  .directive('meanbaseEditable', function ($sanitize, $rootScope) {
    return {
      restrict: 'EA',
      scope: {
      	html:'=ngBindHtml',
      	config:'=config'
      },
      link: function (scope, element, attrs) {

        // Sets up default configuration for our text editors
        var config = {
          autogrow: true,
          fullscreenable: false,
          btnsDef: {
              // Customizables dropdowns
              align: {
                  dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                  ico: 'justifyLeft'
              },
              image: {
                  dropdown: ['insertImage', 'chooseImage'],
                  ico: 'insertImage'
              },
              lists: {
                dropdown: ['unorderedList', 'orderedList'],
                ico:'unorderedList'
              },
              chooseImage: {
                func: function(params, tbw) {
                  element.trumbowyg('saveSelection');
                  scope.$parent.openImageModal({multiple: false}, function(image) {
                    element.trumbowyg('restoreSelection');
                    var imageToInsert = new Image();
                    imageToInsert.src = image.small;
                    imageToInsert.alt = image.alt;
                    imageToInsert.class = 'img-responsive';
                    var sel = element.trumbowyg('getSelection');
                    sel.insertNode(imageToInsert);
                  });
                },
                ico: 'insertImage'
              }
          },
          btns: ['viewHTML',
              '|', 'formatting',
              '|', 'align',
              '|', 'lists',
              '|', 'chooseImage']
        };

        var _snapshot;

        function enableTextEditor() {

          // Create the text editor instance. These events enable us to wrap the text in green outlines
          element.trumbowyg(config)
          .on('tbwfocus', function(){ trumbowygBox.addClass('hasFocus'); })
          .on('tbwblur', function(){ trumbowygBox.removeClass('hasFocus'); });

          // Get the element we want to add the hasFocus class to
          var trumbowygBox = element.parent('.trumbowyg-box');

        	// Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
        	_snapshot = angular.copy(scope.html);

          // We want to set the trumbowyg html to a copy of the inital value so if the extension drags around we retain it's html
          element.trumbowyg('html', _snapshot);
        } //enableTextEditor


        // Start up the text editors when editMode is activated
        if($rootScope.editMode) {
          enableTextEditor();
        }
        
        scope.$onRootScope('cms.editMode', function(event, value) {
          if(value) { enableTextEditor(); }
        });

        // When the user discards their edits, reset trumbowyg and ng-bind-html to the snapshot
        scope.$onRootScope('cms.discardEdits', function() {
          element.trumbowyg('html', _snapshot);
          scope.html = _snapshot;
          element.trumbowyg('destroy');
        });

        // When the user saves their changes, update the ng-bind-html with the trymbowyg html
        scope.$onRootScope('cms.saveEdits', function() {
          scope.html = element.trumbowyg('html');
          element.trumbowyg('destroy');
        });

      } //link
    }; //return
  });