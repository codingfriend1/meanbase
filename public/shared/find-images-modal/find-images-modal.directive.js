'use strict';

angular.module('meanbaseApp')
  .directive('findImagesModal', function ($rootScope) {
    return {
      // templateUrl: 'components/find-images-modal/find-images-modal.html',
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {
      	var config = scope.findImagesConfig;

        console.log("config", config);
      	element.bind('click', function() {
          if(!$rootScope.editMode) { return false; }
      		// openImageModal is defined in main.controller
          console.log("config", config);
      		$rootScope.openImageModal(config, function(selectedImages) {
      			$rootScope.$emit('cms.choseImages', {gallerySlug:  config.gallerySlug, images: selectedImages});
      		});
      	});


      }
    };
  });
