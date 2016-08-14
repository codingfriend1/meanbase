angular.module('meanbaseApp')
  .directive('chooseImage', function ($rootScope, endpoints, $compile) {
    return {
      template: '<ng-transclude find-images-modal find-images-config="findImagesConfig"></ng-transclude>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(element, attrs) {
        return {
          pre: function preLink(scope, element, attrs, controller) {
            scope.findImagesConfig = {
              multiple: false,
              allOperations: false,
              gallerySlug: attrs.for,
              alreadySelected: $rootScope.page.images[attrs.for]
            };

            scope.$onRootScope('cms.choseImages', function(e, gallery) {
              if(attrs.for === gallery.gallerySlug) {
                var image = (Array.isArray(gallery.images))? gallery.images[0]: gallery.images;
                if(image) {
                  image.location = attrs.for;
                  image.modifiedurl = image[attrs.size];
                  $rootScope.page.images[attrs.for] = image;
                  scope.findImagesConfig.alreadySelected = image;
                } else {
                  $rootScope.page.images[attrs.for] = undefined;
                  scope.findImagesConfig.alreadySelected = undefined;
                }
              }
            });
          }
        }
      },
    }
  });
