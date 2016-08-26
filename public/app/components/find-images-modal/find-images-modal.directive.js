'use strict';

angular.module('meanbaseApp')
  .directive('findImagesModal', function ($rootScope) {
    return {
      // templateUrl: 'components/find-images-modal/find-images-modal.html',
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {
        if(!$rootScope.isLoggedIn) { return false; }

      	var config = scope.findImagesConfig;
        var chosenElement = element;

        if(element.find('mb-src')) {
          chosenElement = element.find('[mb-src]:first');
        }

      	chosenElement.bind('click', function(event) {
          if(!$rootScope.editMode) { return false; }

          if (event.target !== this) { return };

      		// openImageModal is defined in main.controller
      		$rootScope.openImageModal(config, function(selectedImages) {
      			$rootScope.$emit('cms.choseImages', {gallerySlug:  config.gallerySlug, images: selectedImages});
      		});
      	});


      }
    };
  });
