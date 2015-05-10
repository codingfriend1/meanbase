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

        scope.slug = scope.extension.config.slug;
        scope.interval = scope.extension.config.interval;


      	// Use all images that have this gallery slug title
      	if(scope.slug) {
      		media.find({galleries: scope.slug}).then(function(response) {
      		  scope.images = response.data;
      		  for(var i = 0; i < scope.images.length; i++) {
      		  	scope.images[i].modifiedurl = scope.images[i].url + 'origional.jpg';
      		  };
      		});
      	}

        // If images where chosen that share the name of this gallery slug then retrieve those selected images
      	scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.slug === gallery.slug) {
            scope.images = gallery.images;
          }
      	});
      }
    };
  });