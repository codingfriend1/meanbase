'use strict';

angular.module('extensions')
  .directive('gallery', function (endpoints) {
    return {
      templateUrl: 'extensions/gallery/gallery.html',
      restrict: 'EA',
      scope: {
      	interval:"@",
      	editMode:"=",
      	gallerySlug:"="
      },
      link: function (scope, element, attrs) {
      	var media = new endpoints('media');

      	// Find all images that have this gallery slug
      	if(scope.gallerySlug) {
      		media.find({galleries: scope.gallerySlug}).then(function(response) {
      		  scope.images = response.data;
      		  for(var i = 0; i < scope.images.length; i++) {
      		  	scope.images[i].modifiedurl = scope.images[i].url + 'origional.jpg';
      		  };
      		});
      	}
      	
      }
    };
  });