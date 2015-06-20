'use strict';

angular.module('meanbaseApp')
  .directive('editCKEditor', function ($sanitize) {
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
			    entities: false,
			    fullPage: true,
          allowedContent:
          'h1 h2 h3 p blockquote strong em;' +
          'a[!href];' +
          'img(left,right)[!src,alt,width,height];',
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

          ck.on('blur', function() {
            console.log('blur');
          });

          CKEDITOR.on( "currentInstance", function() {
            console.log('change instance');
          });

          // Save images that are inserted in
          ck.on('insertElement', function( evt ) {
            console.log('inserted element', ck);
            ck.focusManager.blur();
            ck.focusManager.blur();
            ck.focusManager.blur();
            // ck.getData();
            // ck.updateElement();
            // ck.setData(ck.getData());
            // ck.focusManager.blur(true);
          });

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

        // scope.$onRootScope('blurEditors', function() {
        //   ck.focusManager.forceBlur();
        //   console.log('bluring editors');
        // });

        // When cms.headbar or any other script releases the event to discard edits, reset to snapshot
        scope.$onRootScope('cms.discardEdits', function() {
          ck.setData(scope.html);
          // scope.html = snapshot;
        });

        // When the save edits event is fired on rootscope listen and save ckeditor data to html
        scope.$onRootScope('cms.saveEdits', function() {
          console.log('getting data');
          scope.html = ck.getData();
        });

      } //link
    }; //return
  });