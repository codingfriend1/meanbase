'use strict';

angular.module('meanbaseApp')
  .directive('singleImage', function ($rootScope, endpoints, $timeout, FileUploader, Auth) {
    return {
      templateUrl: require('./single-image.jade'),
      restrict: 'EA',
      scope: {
      	singleImage: "@",
      	caption:"@",
      	placeholdIt:"@",
        imageClasses: "@"
      },
      compile: function(element, attrs){
        return {
          pre: function(scope, element, attrs, controller, transcludeFn){

            scope.singleImage = scope.singleImage || 'image-1';

            scope.editMode = $rootScope.editMode;

            // If the user is authorized
            if (Auth.getToken()) {
              // Make this area uploadable
              scope.mediaUploader = new FileUploader({
                url: '/api/media',
                headers: {
                  'Authorization': 'Bearer ' + Auth.getToken()
                },
                formData: [
                  {galleries: scope.singleImage}
                ]
              });

              scope.mediaUploader.onCompleteAll = function() {
                scope.mediaUploader.clearQueue();
              };

              scope.mediaUploader.onCompleteItem = function() {
                $rootScope.$emit('cms.imagesUploaded');
              };

              scope.mediaUploader.onSuccessItem = function(item, response, status, headers) {
                scope.image = response;
                scope.image.location = scope.singleImage;
                scope.image.modifiedurl = response.url + 'medium.jpg';
                $rootScope.page.images[scope.singleImage] = scope.image;
              };
            }

            scope.$watch('editMode', function(newValue, oldValue) {
              if(newValue === oldValue) { return false; }
              if(newValue) {
                if(scope.mediaUploader) {
                  // If in edit mode upload the images passed in.
                  scope.mediaUploader.onAfterAddingAll = function() {
                    scope.mediaUploader.uploadAll();
                  };
                }
              } else {
                if(scope.mediaUploader) {
                  // Otherwise discard them
                  scope.mediaUploader.onAfterAddingAll = function() {
                    scope.mediaUploader.clearQueue();
                  };
                }
              }
            });
          },
          post: function(scope, element, attrs, controller, transcludeFn){
            scope.groups = ['all', 'selected'];
            scope.media = [];
            var imageSnapshot;
            var areChanges = false;

            // Safety check in case attrs are missing
            if(!scope.placeholdIt) { scope.placeholdIt = 'http://placehold.it/300x300'; }
            scope.caption = (scope.caption === true || scope.caption === 'true');
            $rootScope.page.images = $rootScope.page.images || {};
            var defaultImage = {
              modifiedurl: scope.placeholdIt || 'http://placehold.it/300x300',
              alt: "Placeholder Image displaying recommended size",
              attribute: "placehold.it"
            };
            if(!$rootScope.page.images[scope.singleImage]) {
              $rootScope.page.images[scope.singleImage] = defaultImage;
            }

            // Watch for changes on the page.images object (in case "discard" changed it)
            scope.$watch(function() {
              return $rootScope.page.images[scope.singleImage];
            }, function(newValue) {
              scope.image = newValue;
              if(!scope.image) { return false; }
              if(!scope.image.modifiedurl) {
                scope.image.modifiedurl = scope.image.url + 'origional.jpg';
              }
              scope.findImagesConfig.alreadySelected = newValue;
            });

            scope.findImagesConfig = {
              multiple: false,
              allOperations: false,
              gallerySlug: scope.singleImage,
              alreadySelected: $rootScope.page.images[scope.singleImage]
            };

            imageSnapshot = angular.copy($rootScope.page.images[scope.singleImage]);

            // Choose and set the image
            scope.$onRootScope('cms.choseImages', function(e, gallery) {
              if(scope.singleImage === gallery.gallerySlug) {
                scope.image = (Array.isArray(gallery.images))? gallery.images[0]: gallery.images;
                if(scope.image) {
                  scope.image.location = scope.singleImage;
                  scope.image.modifiedurl = scope.image.origional;
                  $rootScope.page.images[scope.singleImage] = scope.image;
                } else {
                  scope.image = defaultImage;
                  $rootScope.page.images[scope.singleImage] = scope.image;
                }
                areChanges = true;
              }
            });

            // When the user saves their changes, set the new snapshot
            scope.$onRootScope('cms.saveEdits', function() {
              if(areChanges) {
                imageSnapshot = angular.copy($rootScope.page.images[scope.singleImage]);
                areChanges = false;
              }
            });

            // If the user discards their changes reset to the snapshot
            scope.$onRootScope('cms.discardEdits', function() {
              scope.image = imageSnapshot;
              $rootScope.page.images[scope.singleImage] = scope.image;
            });
          }
        } //return
      } //compile
    };
  });
