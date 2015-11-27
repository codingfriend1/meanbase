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
        var areChanges;
        var imagesSnapshot;

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

            scope.findImagesConfig.alreadySelected = scope.images;
      		  imagesSnapshot = angular.copy(scope.images);
      		});
      	}

        scope.findImagesConfig = {
          multiple: true,
          allOperations: false,
          gallerySlug: scope.extension.config.slug,
          alreadySelected: scope.images
        };

        scope.findImagesConfig.gallerySlug = scope.extension.config.slug;

        scope.$watch(function () {
          return scope.extension.config.slug;
        }, function(nv, ov) {
          if(nv === ov) {return false; }
          scope.findImagesConfig.gallerySlug = nv;
        });

        imagesSnapshot = angular.copy(scope.images);

        // If images where chosen that share the name of this gallery slug then retrieve those selected images
      	scope.$onRootScope('cms.choseImages', function(e, gallery) {
          if(scope.extension.config.slug === gallery.gallerySlug) {
            for (var i = 0; i < gallery.images.length; i++) {
              gallery.images[i].modifiedurl = gallery.images[i].large;
            };
            scope.images = angular.copy(gallery.images);
            scope.findImagesConfig.alreadySelected = scope.images;
            areChanges = true;
          }
      	});

        // When the save button is hit on the cms headbar have the main.controller publishGallerySelection save the slugs to the appropriate images
        scope.$onRootScope('cms.saveEdits', function() {
          if(areChanges) {
            imagesSnapshot = angular.copy(scope.images);
            $rootScope.publishGallerySelection(scope.extension.config.slug, scope.images);
            areChanges = false;
          }
        });

        // If the discard button is hit on the cms headbar have reset the gallery images to the snapshot
        scope.$onRootScope('cms.discardEdits', function() { 
          scope.images = imagesSnapshot;
          scope.findImagesConfig.alreadySelected = imagesSnapshot; 
          areChanges = false;
        });
      }
    };
  });