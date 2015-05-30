'use strict';

angular.module('meanbaseApp')
  .directive('singleImage', function ($rootScope, FileUploader) {
    return {
      templateUrl: 'components/single-image/single-image.html',
      restrict: 'EA',
      scope: {
      	singleImage: "@",
      	caption:"@",
      	placeholdIt:"@",
      	editMode: "="
      },
      link: function (scope, element, attrs) {

        var endpoint = new endpoints('media');
        $scope.groups = ['all', 'selected'];
        $scope.media = [];

        if ($cookieStore.get('token')) {
          var uploader = $scope.uploader = new FileUploader({
              url: '/api/media',
              headers: {
                'Authorization': 'Bearer ' + $cookieStore.get('token')
              },
              autoUpload: true
          });
        }

        uploader.onCompleteAll = function() {
          uploader.clearQueue()
        };

        uploader.onCompleteItem = function() {
          $rootScope.$emit('cms.imagesUploaded');
        };


        // Safety check in case attributes are missing
        if(!scope.placeholdIt) { scope.placeholdIt = 'http://placehold.it/300x300'; }
        scope.singleImage = scope.singleImage || 'image-1';
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
    	    	}
    	    }
    		});
      }
    };
  });