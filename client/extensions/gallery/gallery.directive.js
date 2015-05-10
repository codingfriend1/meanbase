'use strict';

// This directive uses the gallerySlug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('gallery', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/gallery/gallery.html',
      restrict: 'EA',
      scope: {
      	// interval:"@",
      	// editMode:"=",
      	// gallerySlug:"@"
      },
      link: function (scope, element, attrs) {
      	var media = new endpoints('media');
        console.log(scope.$parent.extension);

        scope.editMode = $rootScope.editMode || true;
        scope.gallerySlug = scope.$parent.extension.config.slug || 'gallery-1';
        scope.interval = scope.$parent.extension.config.interval || 3000;
      	// Use all images that have this gallery slug title
      	if(scope.gallerySlug) {
      		media.find({galleries: scope.gallerySlug}).then(function(response) {
      		  scope.images = response.data;
      		  for(var i = 0; i < scope.images.length; i++) {
      		  	scope.images[i].modifiedurl = scope.images[i].url + 'origional.jpg';
      		  };
      		});
      	}

        // If images where chosen that share the name of this gallery slug then retrieve those selected images
      	scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.gallerySlug === gallery.gallerySlug) {
            scope.images = gallery.images;
          }
      	});
      	
      }
    };
  });