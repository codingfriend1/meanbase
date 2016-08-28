angular.module('meanbaseApp')
  .directive('chooseImage', function ($rootScope, endpoints, $compile, $timeout) {
    return {
      template: '<ng-transclude find-images-modal find-images-config="findImagesConfig"></ng-transclude>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(element, attrs) {
        return {
          pre: function preLink(scope, element, attrs, controller) {

            if(!$rootScope.isLoggedIn) { return false; }

            var key;

            function getBelongsTo() {
              if(attrs.belongsTo) {
                scope.belongsTo = scope.$parent.$eval(attrs.belongsTo) || {};
                key = attrs.property + attrs.belongsTo + Date.now();
              } else {
                scope.belongsTo = $rootScope.page.images;
                key = attrs.property;
                if(!scope.belongsTo[key]) {
                  scope.belongsTo[key] = {};
                }
              }
            }

            getBelongsTo();

            scope.findImagesConfig = {
              multiple: false,
              allOperations: false,
              gallerySlug: key,
              alreadySelected: scope.belongsTo[attrs.property]
            };

            scope.$onRootScope('cms.saveListItem', function(event, value) {
              $timeout(function() {
                scope.belongsTo = scope.$parent.$eval(attrs.belongsTo) || {};
              });
            });

            scope.$onRootScope('cms.choseImages', function(e, gallery) {
              if(key === gallery.gallerySlug) {
                getBelongsTo();
                scope.findImagesConfig.gallerySlug = key;
                var image = (Array.isArray(gallery.images))? gallery.images[0]: gallery.images;
                if(image) {
                  image.location = attrs.property;
                  image.modifiedurl = image[attrs.size] || image.url;
                  scope.belongsTo[attrs.property] = {};
                  scope.belongsTo[attrs.property].url = image.url;
                  scope.belongsTo[attrs.property].alt = image.alt;
                  scope.belongsTo[attrs.property].modifiedurl = image.modifiedurl;
                  scope.belongsTo[attrs.property].location = image.location;

                  scope.findImagesConfig.alreadySelected = image;
                } else {
                  scope.belongsTo[attrs.property] = undefined;
                  scope.findImagesConfig.alreadySelected = undefined;
                }
              }
            });
          }
        }
      },
    }
  });
