angular.module('meanbaseApp')
  .directive('chooseImage', function ($rootScope, endpoints) {
    return {
      templateUrl: require('./chooseImage.jade'),
      restrict: 'A',
      scope: {
        chooseImage: "@",
        size:"@"
      },
      link: function (scope, element, attrs) {

        scope.findImagesConfig = {
          multiple: false,
          allOperations: false,
          gallerySlug: scope.chooseImage,
          alreadySelected: $rootScope.page.images[scope.chooseImage]
        };

        scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.chooseImage === gallery.gallerySlug) {
            var image = (Array.isArray(gallery.images))? gallery.images[0]: gallery.images;
            if(image) {
              image.location = scope.chooseImage;
              image.modifiedurl = image[scope.size];
              $rootScope.page.images[scope.chooseImage] = image;
              scope.findImagesConfig.alreadySelected = image;
            } else {
              $rootScope.page.images[scope.chooseImage] = undefined;
              scope.findImagesConfig.alreadySelected = undefined;
            }
          }
        });
      }
    }

  });
