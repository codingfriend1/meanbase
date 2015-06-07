'use strict';

angular.module('meanbaseApp')
  .directive('edit', function ($sanitize) {
    return {
      restrict: 'EA',
      scope: {
      	html:'=ngBindHtml',
      	editMode:'=edit',

        // should contain discard() to undo edits
      	config:'=config'
      },
      link: function (scope, element, attrs) {

        var config = {
          autogrow: true,
          closable: true,
          fullscreen: true
        };

        var ck = {}, snapshot;

        if(!scope.html) {
        	scope.html = attrs.id? attrs.id + ' editable area': 'editable area';
        }

        function startUpCKEditor() {
          
        	element.attr('contenteditable', true);
        	// Create ck instance
          element.trumbowyg({
            autogrow: true
          });
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