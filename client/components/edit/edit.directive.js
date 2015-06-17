'use strict';

angular.module('meanbaseApp')
  .directive('edit', function ($sanitize, $timeout, $compile, $modal) {
    return {
      restrict: 'EA',
      scope: {
      	html:'=ngBindHtml',
      	editMode:'=edit',

        // should contain discard() to undo edits
      	config:'=config'
      },
      link: function (scope, element, attrs) {

        scope.imageSelectorApi = {};

        var config = {
          autogrow: true,
          // closable: true,
          fullscreenable: false,
          // fixedBtnPane: true,
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
                  scope.$parent.openImageModal(function(image) {
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

        var ck = {}, snapshot;

        if(!scope.html) {
        	scope.html = attrs.id? attrs.id + ' editable area': 'editable area';
        }

        function startUpCKEditor() {
          
        	element.attr('contenteditable', true);
        	// Create ck instance
          element.trumbowyg(config)
          .on('tbwfocus', function(){ trumbowygBox.addClass('hasFocus'); }) // Listen for `tbwfocus` event
          .on('tbwblur', function(){ trumbowygBox.removeClass('hasFocus'); })

          var trumbowygBox = element.parent('.trumbowyg-box');

        	// Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
        	snapshot = angular.copy(scope.html);


        } //startUpCKEditor

        function shutdownCkEditor() {
          element.trumbowyg('destroy');
        	element.attr('contenteditable', false);
        }

        if(scope.editMode) {
          startUpCKEditor();
        }
  
        // Watch editMode to know when to start up and shut down ckeditor
        scope.$onRootScope('cms.editMode', function(value) {
          if(value) {
            startUpCKEditor();
          } else {
            shutdownCkEditor();
          }
        });

        // When cms.headbar or any other script releases the event to discard edits, reset to snapshot
        scope.$onRootScope('cms.discardEdits', function() {
          element.trumbowyg('html', snapshot);
          scope.html = snapshot;
          shutdownCkEditor();
        });

        // When the save edits event is fired on rootscope listen and save ckeditor data to html
        scope.$onRootScope('cms.saveEdits', function() {
          scope.html = element.trumbowyg('html');
          shutdownCkEditor();
        });

      } //link
    }; //return
  });