var fileBrowser = angular.module('meanbaseApp', ['ngCropper', 'toastr']).config(function ($provide, $locationProvider) {
	$locationProvider.html5Mode(true);
  $provide.decorator('$rootScope', ['$delegate', function($delegate){
    $delegate.constructor.prototype.$onRootScope = function(name, listener){
      var unsubscribe = $delegate.$on(name, listener);
      this.$on('$destroy', unsubscribe);
    };
    return $delegate;
  }]);
});

fileBrowser.controller('fileBrowserCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.imageSelectorApi = {};

	$scope.choose = function() {
		var selectedImage = $scope.imageSelectorApi.getSelectedImages();
		// var fileUrl = 'images/' + image.url;
		var fileUrl = selectedImage.small;
		var number = $location.search().CKEditorFuncNum;
		window.opener.CKEDITOR.tools.callFunction(number, fileUrl, function() {
			// Get the reference to a dialog window.
			var element, dialog = this.getDialog();
			// Check if this is the Image dialog window.
			if (dialog.getName() == 'image') {
				// Get the reference to a text field that holds the "alt" attribute.
				element = dialog.getContentElement( 'info', 'txtAlt' );
			// Assign the new value.
			if ( element )
				if(selectedImage.alt) {
					element.setValue(selectedImage.alt);
				}
			}
		});
		window.top.close() ;
		window.top.opener.focus() ;
	};
}]);