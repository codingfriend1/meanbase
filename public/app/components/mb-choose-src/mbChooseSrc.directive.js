angular.module('meanbaseApp')
  .directive('mbChooseImage', function ($rootScope, endpoints, $compile, $timeout) {
    return {
      template: '<div find-images-modal find-images-config="findImagesConfig"><img class="img-responsive" src="http://placehold.it/768x432"></div>',
      restrict: 'E',
      scope: true,
      compile: function(element, attrs) {
        return {
          pre: function preLink(scope, element, attrs, controller) {

            if(!$rootScope.isLoggedIn) { return false; }

            scope.placeholdIt = scope.placeholdIt || "http://placehold.it/768x432";

            var imageEl = element.find('img:first');

            var key = Date.now();

            scope.findImagesConfig = {
              multiple: false,
              allOperations: false,
              gallerySlug: key,
              alreadySelected: ''
            };

            element.bind('click', function(event) {
              if(!$rootScope.editMode) { return false; }
          		// openImageModal is defined in main.controller
          		$rootScope.openImageModal(scope.findImagesConfig, function(selectedImages) {
          			$rootScope.$emit('cms.choseImages', {gallerySlug:  scope.findImagesConfig.gallerySlug, images: selectedImages});
          		});
          	});

            scope.$onRootScope('cms.choseImages', function(e, gallery) {
              if(key === gallery.gallerySlug) {
                scope.findImagesConfig.gallerySlug = key;
                var image = (Array.isArray(gallery.images))? gallery.images[0]: gallery.images;
                if(image) {
                  var url = image[attrs.size] || image.url + 'original.jpg';
                  var alt = image.alt;

                  imageEl.attr('src', url);
                  if(alt) {
                    imageEl.attr('alt', alt);
                  }

                  scope.findImagesConfig.alreadySelected = image;
                } else {
                  imageEl.attr('src', scope.placeholdIt);
                  imageEl.attr('alt', '');
                }
              }
            });

          }
        }
      },
    }
  });
