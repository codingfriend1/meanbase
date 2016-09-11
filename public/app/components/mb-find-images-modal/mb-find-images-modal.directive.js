angular.module('meanbaseApp')
  .directive('mbFindImagesModal', function ($rootScope, $timeout, imageModal) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element, attrs) {
        if(!$rootScope.isLoggedIn) { return false; }

      	var config = scope.findImagesConfig;

        element.bind('click', function openModal(event) {
          event.stopPropagation()
          if(!$rootScope.editMode) { return false; }

          if (event.target !== this && !$(event.target).is('[mb-src]') && !$(event.target).is('img')) { return };

          imageModal.open(config, function(selectedImages) {
            $rootScope.$emit('cms.choseImages', {gallerySlug:  config.gallerySlug, images: selectedImages});
          })
        });
      }
    };
  });
