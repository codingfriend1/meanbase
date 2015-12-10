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

        var el = jQuery(element);

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
                  el.trumbowyg('saveSelection');
                  scope.$parent.openImageModal({multiple: false}, function(image) {
                    el.trumbowyg('restoreSelection');
                    var imageToInsert = new Image();
                    imageToInsert.src = image.small;
                    imageToInsert.alt = image.alt;
                    imageToInsert.class = 'img-responsive';
                    var sel = el.trumbowyg('getSelection');
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
          el.trumbowyg(config)
          .on('tbwfocus', function(){ trumbowygBox.addClass('hasFocus'); })
          .on('tbwblur', function(){ trumbowygBox.removeClass('hasFocus'); });

          // Get the el we want to add the hasFocus class to
          var trumbowygBox = el.parent('.trumbowyg-box');
          angular.element(window).bind('click', trackMouse);

        	// Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
        	_snapshot = angular.copy(scope.html);

          // We want to set the trumbowyg html to a copy of the inital value so if the extension drags around we retain it's html
          el.trumbowyg('html', _snapshot);
        } //enableTextEditor


        // Start up the text editors when editMode is activated
        if($rootScope.editMode) {
          enableTextEditor();
        }

        scope.$onRootScope('cms.editMode', function(event, value) {
          if(value) { enableTextEditor(); }
        });

        function trackMouse(event) {
          var evt = $(event.target);
          if(evt.is('[meanbase-editable]') || evt.parents('[meanbase-editable]').length > 0) {
            var box = evt.parents('.trumbowyg-box');
            var topPosition = box.offset().top + box.outerHeight() - event.clientY + 10;
            var pane = box.find('ul.trumbowyg-button-pane');
            pane.css('bottom', topPosition);
          }
        }

        // When the user discards their edits, reset trumbowyg and ng-bind-html to the snapshot
        scope.$onRootScope('cms.discardEdits', function() {
          el.trumbowyg('html', _snapshot);
          scope.html = _snapshot;
          el.trumbowyg('destroy');
          angular.element(window).unbind('click', trackMouse);
        });

        // When the user saves their changes, update the ng-bind-html with the trymbowyg html
        scope.$onRootScope('cms.saveEdits', function() {
          scope.html = el.trumbowyg('html');
          el.trumbowyg('destroy');
        });

      } //link
    }; //return
  });
