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
        var config = scope.config || {
			    language: 'en',
			    allowedContent: true,
			    entities: false,
			    fullPage: true,
          simpleImageBrowserURL: 'test',
			    filebrowserBrowseUrl: '/ckeditor-browser',
			    filebrowserImageUploadUrl: '/api/media'
			  };

        var ck = {}, snapshot;

        if(!scope.html) {
        	scope.html = attrs.id? attrs.id + ' editable area': 'editable area';
        }

        function startUpCKEditor() {
          
        	element.attr('contenteditable', true);
        	// Create ck instance
        	ck = CKEDITOR.inline(element[0], config);

        	// Set the ck instances value to the value of ng-bind-html
        	ck.setData(scope.html);

        	// Store the initial data in a snapshot in case we need to restore the inital data if the user cancels their changes
        	snapshot = ck.getData();

        } //startUpCKEditor

        function shutdownCkEditor() {
        	if(ck.destroy) { ck.destroy(); element.attr('contenteditable', false); }
        }

        // Watch editMode to know when to start up and shut down ckeditor
        scope.$watch('editMode', function(newValue, oldValue) {
        	if(newValue) {
        		startUpCKEditor();
        	} else {
        		shutdownCkEditor();
        	}
        });

        // When cms.headbar or any other script releases the event to discard edits, reset to snapshot
        scope.$onRootScope('cms.discardEdits', function() {
          ck.setData(scope.html);
          // scope.html = snapshot;
        });

        // When the save edits event is fired on rootscope listen and save ckeditor data to html
        scope.$onRootScope('cms.saveEdits', function() {
          scope.html = ck.getData();
        });

      } //link
    }; //return
  });