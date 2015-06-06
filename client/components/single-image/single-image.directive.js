'use strict';

angular.module('meanbaseApp')
  .directive('singleImage', function ($rootScope, endpoints, $timeout, FileUploader, $cookieStore) {
    return {
      templateUrl: 'components/single-image/single-image.html',
      restrict: 'EA',
      scope: {
      	singleImage: "@",
      	caption:"@",
      	placeholdIt:"@",
      	editMode: "="
      },
      compile: function(element, attributes){
        return {
          pre: function(scope, element, attributes, controller, transcludeFn){

            scope.singleImage = scope.singleImage || 'image-1';

            // If the user is authorized
            if ($cookieStore.get('token')) {

              // Make this area uploadable
              scope.mediaUploader = new FileUploader({
                url: '/api/media',
                headers: {
                  'Authorization': 'Bearer ' + $cookieStore.get('token')
                },
                formData: [
                  {galleries: scope.singleImage}
                ]
              });
            }
            
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

            scope.$watch('editMode', function(newValue, oldValue) {
              if(newValue === oldValue) { return false; }
              if(newValue) {
                // If in edit mode upload the images passed in.
                scope.mediaUploader.onAfterAddingAll = function() {
                  scope.mediaUploader.uploadAll();
                };
              } else {
                // Otherwise discard them
                scope.mediaUploader.onAfterAddingAll = function() {
                  scope.mediaUploader.clearQueue();
                };
              }
            });
          },
          post: function(scope, element, attributes, controller, transcludeFn){
            scope.groups = ['all', 'selected'];
            scope.media = [];


            // Safety check in case attributes are missing
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
            });

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
              }
            });
          }
        } //return 
      } //compile
    };
  });