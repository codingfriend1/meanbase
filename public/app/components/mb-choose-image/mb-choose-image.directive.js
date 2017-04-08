angular.module('meanbaseApp')
  .directive('mbChooseImage', function ($rootScope, endpoints, $compile, $timeout) {
    return {
      template: '<ng-transclude mb-find-images-modal mb-find-images-config="findImagesConfig"></ng-transclude>',
      restrict: 'E',
      transclude: true,
      replace: true,
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
              multiple: attrs.multiple || false,
              allOperations: false,
              gallerySlug: key,
              alreadySelected: scope.belongsTo[attrs.property]
            };

            scope.$onRootScope('cms.updateView', function(event, value) {
              $timeout(function() {
                scope.belongsTo = scope.$parent.$eval(attrs.belongsTo) || {};
              });
            });

            scope.$onRootScope('cms.choseImages', function(e, gallery) {
              if(key === gallery.gallerySlug) {
                console.log('gallery', gallery);
                getBelongsTo();
                scope.findImagesConfig.gallerySlug = key;
                if(gallery.images) {
                  if(Array.isArray(gallery.images)) {
                    scope.belongsTo[attrs.property] = [];
                    for (var i = 0; i < gallery.images.length; i++) {
                      var image = gallery.images[i];
                      if(image) {
                        let newImage = {}
                        image.location = attrs.property;
                        image.modifiedurl = image[attrs.size] || image.url;

                        newImage.url = image.url;
                        newImage.alt = image.alt;
                        newImage.modifiedurl = image.modifiedurl;
                        newImage.location = image.location;

                        scope.belongsTo[attrs.property].push(newImage)
                      }
                    }
                    scope.findImagesConfig.alreadySelected = gallery.images;
                  } else {
                    var image = gallery.images;
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

                  $rootScope.$emit('cms.elementsChanged')
                } else {
                  scope.belongsTo[attrs.property] = undefined;
                  scope.findImagesConfig.alreadySelected = undefined;
                }


                $rootScope.$emit('updateView')
              }
            });
          }
        }
      },
    }
  });
