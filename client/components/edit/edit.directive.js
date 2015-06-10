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
                  console.log("params, tbw", params, tbw);
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


          // var $modal = element.trumbowyg("openModal", {
          //     title: "A title for modal box",
          //     content: "<p>Content in HTML which you want include in created modal box</p>"
          // });

          // // Listen clicks on modal box buttons
          // $modal.on('trumbowyg-confirm', function(e){
          //     // Save datas
          //     console.log('Trumbowyg', $.Trumbowyg);
          //     console.log(Trumbowyg.execCmd('insertImage', 'http://placehold.it/300x400'));
          //     $("#editor").trumbowyg("closeModal");
          // });
          // $modal.on('trumbowyg-cancel', function(e){
          //     $("#editor").trumbowyg("closeModal");
          // });


          // element.trumbowyg('html', scope.html);
         //  element.Editor();
        	// element.Editor('setText', scope.html);

        	// Set the ck instances value to the value of ng-bind-html
        	// ck.setData(scope.html);

        	// Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
        	snapshot = angular.copy(scope.html);


        } //startUpCKEditor

        function shutdownCkEditor() {
          element.trumbowyg('destroy');
        	element.attr('contenteditable', false);
        }

        // Watch editMode to know when to start up and shut down ckeditor
        scope.$watch('editMode', function(newValue, oldValue) {
        	if(newValue) {
        		startUpCKEditor();
        	} else {
        		shutdownCkEditor();
        	}
        });

        // scope.$onRootScope('blurEditors', function() {
        //   ck.focusManager.forceBlur();
        //   console.log('bluring editors');
        // });

        // When cms.headbar or any other script releases the event to discard edits, reset to snapshot
        scope.$onRootScope('cms.discardEdits', function() {
          element.trumbowyg('html', snapshot);
          scope.html = snapshot;
        });

        // When the save edits event is fired on rootscope listen and save ckeditor data to html
        scope.$onRootScope('cms.saveEdits', function() {
          scope.html = element.trumbowyg('html');
        });

      } //link
    }; //return
  });