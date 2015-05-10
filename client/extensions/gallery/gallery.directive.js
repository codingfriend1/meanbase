'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('gallery', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/gallery/gallery.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	var media = new endpoints('media');

        if(!scope.extension.config.slug) { scope.extension.config.slug = 'gallery-1'; }
        if(!scope.extension.config.interval) { scope.extension.config.interval = 3000; }
        if(!scope.data) { scope.data = {}; }

      	// Use all images that have this gallery slug title
      	if(scope.extension.config.slug) {
      		media.find({galleries: scope.extension.config.slug}).then(function(response) {
      		  scope.data.images = response.data;
      		  for(var i = 0; i < scope.data.images.length; i++) {
      		  	scope.data.images[i].modifiedurl = scope.data.images[i].url + 'origional.jpg';
      		  };
      		});
      	}

        // for (var i = 0; i < imageElements.length; i++) {
        //   imageElements[i].onerror = function(){
        //     // image not found or change src like this as default image:
        //     console.log('image failed to load');
        //   };
        // };

        // If images where chosen that share the name of this gallery slug then retrieve those selected images
      	scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.extension.config.slug === gallery.gallerySlug) {
            scope.data.images = gallery.images;
          }
      	});
      }
    };
  });