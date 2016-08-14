angular.module('meanbaseApp')
  .directive('chooseImage', function ($rootScope, endpoints, $compile) {
    return {
      template: '<ng-transclude find-images-modal find-images-config="findImagesConfig" ng-if="$root.editMode"></ng-transclude>',
      restrict: 'E',
      transclude: true,
      scope: true,
      // compile: function(element, attrs) {
      //   return {
      //     pre: function preLink(scope, element, attrs, controller) {},
      //     post: function postLink(scope, element, attrs, controller) {
      //       setTimeout(function() {
      //         $compile('<span find-images-modal find-images-config="findImagesConfig" ng-if="$root.editMode"><ng-transclude></ng-transclude></span>')(scope);
      //       }, 500);
      //     }
      //   }
      // },
      link: function (scope, element, attrs) {
        // find-images-modal find-images-config="findImagesConfig" ng-if="$root.editMode"
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
  });
