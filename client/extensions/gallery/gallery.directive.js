'use strict';

// This directive uses the slug passed in to get the appropriate images and display them in a slider

angular.module('extensions')
  .directive('gallery', function (endpoints, $rootScope) {
    return {
      templateUrl: 'extensions/gallery/gallery.html',
      restrict: 'EA',
      replace: true,
      link: function (scope, element, attrs) {
      	var media = new endpoints('media');

        if(!scope.extension.config.slug) { scope.extension.config.slug = 'gallery-1'; }
        if(!scope.extension.config.interval) { scope.extension.config.interval = 3000; }
        if(!scope.extension.data) { scope.extension.data = {}; }
        if(!scope.images) { 
          scope.images = [
            {
              "url":"http://placehold.it/900x300",
              "attribute":"Placehold It",
              "alt":"This gallery has no images",
              "modifiedurl":"http://placehold.it/900x300"
            }
          ]; 
        }

      	// Use all images that have this gallery slug title
      	if(scope.extension.config.slug) {
      		media.find({galleries: scope.extension.config.slug}).success(function(response) {
      		  scope.images = response || {};

            if(scope.images.length < 1) {
              scope.images = [{
                "url":"http://placehold.it/900x300",
                "attribute":"Placehold It",
                "alt":"This gallery has no images",
                "modifiedurl":"http://placehold.it/900x300"
              }];
            } else {
              for(var i = 0; i < scope.images.length; i++) {
                scope.images[i].modifiedurl = scope.images[i].url + 'large.jpg';
              };
            }
      		  
      		});
      	}

        // If images where chosen that share the name of this gallery slug then retrieve those selected images
      	scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.extension.config.slug === gallery.gallerySlug) {
            for (var i = 0; i < gallery.images.length; i++) {
              gallery.images[i].modifiedurl = gallery.images[i].large;
            };
            scope.images = gallery.images;
          }
      	});
      }
    };
  });