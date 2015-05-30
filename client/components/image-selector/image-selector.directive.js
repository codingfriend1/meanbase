'use strict';

angular.module('meanbaseApp')
  .directive('imageSelector', function (Cropper, endpoints, $compile, $timeout, $rootScope) {
    return {
      templateUrl: 'components/image-selector/image-selector.html',
      restrict: 'EA',
      // scope: {
      //   multiple:"@",
      //   gallerySlug:"@",
      //   saveAs:"@"
      // },
      link: function (scope, element, attrs) {

        var media = new endpoints('media');
    
        // Stores all interactive elements in the dom object
        var dom = {
          fullscreenContainer: angular.element('.fullscreen-master-container'),
          mainFullsizeBox: angular.element('.fullsize-box.main'),
          nextImageTag: null, //is the next image in sequence when moving right
          previousImageTag: null //is the previous image in sequence when moving left
        };

        // This isn't site wide globals just globals to this file
        var globals = {
          direction: '',
          nextImage: null,
          previousImage: null,
          fullsizeImageIndex: null,
          _fullscreenImage: null
        };

        // Creates albums or groups from all the images returned from the server 
        // only does this when directive is loaded
        function getGroups() {
          // Get media groups
          for (var i = 0; i < scope.media.length; i++) { //Loop through each media
            for (var x = 0; x < scope.media[i].groups.length; x++) { //Loop through each group in media
              if(scope.groups.indexOf(scope.media[i].groups[x]) === -1) { //Already exists?
                scope.groups.push(scope.media[i].groups[x]); //else add to groups array
              }
            }
          }
        }

        // Selects the appropriate images already used by the gallery
        // Only runs on initial load
        function getSelectionFromSlug() {
          if(!scope.gallerySlug) return false;
          for (var i = 0; i < scope.media.length; i++) { //Loop through each media
            if(scope.media[i].galleries.indexOf(scope.gallerySlug) > -1) {
              if(!!scope.multiple && scope.selectedImages.length > 0) { return false; }
              scope.selectedImages.push(scope.media[i]);
            }
          }          

          // Saves the current selection
          saveSelection('longTermSelection');
          saveSelection('shortTermSelection');
        }

        // Stores the currently selected images in the property name passed in
        function saveSelection(property) {
          if(!scope[property]) { return false; }
          scope[property] = [];
          for (var i = 0; i < scope.selectedImages.length; i++) {
            scope[property].push(scope.selectedImages[i].url);
          };
        };

        // Reverts selection back to a saved state in the property
        function resetToSelection(property) {
          if(!scope[property]) { return false; }
          scope.selectedImages = [];
          for (var i = 0; i < scope.media.length; i++) {
            if(scope[property].indexOf(scope.media[i].url) > -1) {
              scope.selectedImages.push(scope.media[i]);
            }
          };
        };

        // Saves changes caption, albums, and owner to the database
        function saveImageEdits() {
          if(!scope.fullscreenImage || !scope.fullscreenImage._id) return false;

          var groupsArraysMatch = scope.fullscreenImage.groups.sort().join(',') === globals._fullscreenImage.groups.sort().join(',');
          var galleriesArraysMatch = scope.fullscreenImage.galleries.sort().join(',') === globals._fullscreenImage.galleries.sort().join(',');

            if(globals._fullscreenImage.alt === scope.fullscreenImage.alt && globals._fullscreenImage.attribute === scope.fullscreenImage.attribute && groupsArraysMatch && galleriesArraysMatch) {
              return false;
            }
          media.update({_id: scope.fullscreenImage._id}, scope.fullscreenImage);
        }


        // When the slider has finished it's animated slide then function the switchImages function
        dom.mainFullsizeBox.bind('transitionend', switchImages);

        function switchImages() {

          // Inform our controls that we are currently moving
          globals.transitioning = false;

          // Remove the current binding since we are about to destory this element and redefine it
          dom.mainFullsizeBox.unbind('transitionend', switchImages);
          dom.mainFullsizeBox.remove();

          if(globals.direction === 'left') {
            // The new mainFullsizeBox is now the image that just finished sliding in
            dom.mainFullsizeBox = dom.previousImageTag;

            // Bind transitionend to this element
            dom.mainFullsizeBox.bind('transitionend', switchImages);

            // Decrease the index
            globals.fullsizeImageIndex--;
          } else if(globals.direction === 'right') {
            // Repeat of above but for right instead
            dom.mainFullsizeBox = dom.nextImageTag;
            dom.mainFullsizeBox.bind('transitionend', switchImages);
            globals.fullsizeImageIndex++;
          }

          // Store the image data snapshot in case we don't save our changes
          globals._fullscreenImage = angular.copy(scope.fullscreenImage); 
        } 


        // Returns the image that comes before the current fullscreen image
        function findPrevious(currentIndex) {
          globals.previousImage = angular.element('.image-thumbnail').eq(currentIndex - 1).find('img');

          if(globals.previousImage.length > 0) {
            // Returns scope data object of image
            return globals.previousImage.scope().item;
          }
          return {};
        }

        // Returns the image that comes after the current fullscreen image
        function findNext(currentIndex) {

          // Using the index of the currently viewed image, find the image that comes afterwards
          globals.nextImage = angular.element('.image-thumbnail').eq(currentIndex + 1).find('img');

          if(globals.nextImage.length > 0) {
            // Returns scope data object of image
            return globals.nextImage.scope().item;
          }
          return {};
          
        }

        // Find all media
        function getMedia() {
          media.find({}).success(function(media) {
            scope.media = media;

            // Take the image path from the server and choose the appropriate image to display
            for (var i = 0; i < scope.media.length; i++) {
              scope.media[i].thumbnail = scope.media[i].url + 'thumbnail.jpg';
              scope.media[i].small = scope.media[i].url + 'small.jpg';
              scope.media[i].medium = scope.media[i].url + 'medium.jpg';
              scope.media[i].large = scope.media[i].url + 'large.jpg';
              scope.media[i].origional = scope.media[i].url + 'origional.jpg';
            };

            getGroups();
            getSelectionFromSlug();

          });
        }

        getMedia();

        scope.$onRootScope('cms.imagesUploaded', function() {
          getMedia();
        });


        scope.fullscreen = false;
        scope.groups = ['all', 'selected'];
        scope.selectedGroup = scope.groups[0];
        scope.selectedImages = [];
        scope.longTermSelection = [];
        scope.shortTermSelection = [];

        // Sets up fields to search by
        scope.mediaFilter = '';
        scope.filterMedia = function(media) {
          return (media.url + media.alt + media.attribute + media.groups.toString()).toLowerCase().indexOf(scope.mediaFilter.toLowerCase()) >= 0;
        };

        // Filter by album or group
        scope.filterByAlbum = function(media) {
          if(scope.selectedGroup === 'all') return true;
          if(scope.selectedGroup === 'selected' && scope.selectedImages.indexOf(media) > -1) { return true; }
          return media.groups.indexOf(scope.selectedGroup) >= 0;
        };

        // Makes the clicked image fullsize
        scope.expand = function($event, image, $index) {

          // Store the index position of the fullscreen image
          globals.fullsizeImageIndex = $index;

          // Set the fullscreen image to the image that was clicked on
          scope.fullscreenImage = angular.element($event.target).scope().item;

          scope.firstImageUrl = scope.fullscreenImage.small;

          $compile(dom.mainFullsizeBox)(scope);
          globals._fullscreenImage = angular.copy(scope.fullscreenImage);

          if(scope.fullscreen === false) {
            scope.fullscreen = true;
          } else {
            // To Do: Have clicking the image select it
          }
        };

        // Exits fullsize image
        scope.exitFullscreen = function() {
          saveImageEdits();
          scope.fullscreen = false;
        };

        // Slide to the next image
        scope.next = function() {

          // If the slider is already sliding don't run this click
          if(globals.transitioning) return false;

          // Check if we are at the end of beginning of the images and so move the currentIndex to the beginning
          if(globals.fullsizeImageIndex >= scope.media.length-1) {
            globals.fullsizeImageIndex = -1;
          }

          // inform our transitionend what direction we've moved
          globals.direction = 'right';

          // Save any changes made to captions, alt, and albums
          saveImageEdits();

          // Set the new fullscreen image
          scope.fullscreenImage = findNext(globals.fullsizeImageIndex);

          // Create a new image element to the right of the current fullscreen image
          dom.nextImageTag = angular.element('<div class="fullsize-box right"><img ng-src="' + scope.fullscreenImage.small + '" class="fullscreen-image"></div>');
          dom.fullscreenContainer.append(dom.nextImageTag);
          $compile(dom.nextImageTag)(scope);

          // Has to go in a timeout so the '.right' class has time to set initial position
          // That way when the 'center' class is added it will slide to the middle
          $timeout(function() {
            dom.nextImageTag.removeClass('right').addClass('center main');
            dom.mainFullsizeBox.addClass('left').removeClass('main center');
          });

          globals.transitioning = true;
        };

        // Slide to the previous image
        scope.prev = function() {
          if(globals.transitioning) return false;
          if(globals.fullsizeImageIndex <= 0) {
            globals.fullsizeImageIndex = scope.media.length;
          }

          globals.direction = 'left';

          saveImageEdits();

          scope.fullscreenImage = findPrevious(globals.fullsizeImageIndex);
          dom.previousImageTag = angular.element('<div class="fullsize-box left"><img ng-src="' + scope.fullscreenImage.small + '" class="fullscreen-image"></div>');
          dom.fullscreenContainer.append(dom.previousImageTag);
          $compile(dom.previousImageTag)(scope);

          $timeout(function() {
            dom.previousImageTag.removeClass('left').addClass('center main');
            dom.mainFullsizeBox.addClass('right').removeClass('main center');
          });

          globals.transitioning = true;
        };


        document.onkeydown = function(e) {

          // Check if keys right and left are coming from an input field or that the altKey is pressed
          // If not then slide the slider in the appropriate direction
          if(e.target.tagName !== 'INPUT' || e.altKey) {
            if(e.keyCode === 37) { //left
              e.preventDefault();
              scope.prev();
            } else if(e.keyCode === 39) { //right
              e.preventDefault();
              scope.next();
            }
          }
        };

        scope.deleteOne = function(image) {
          // Delete image
          if(image.url) {
            media.delete({ url: image.url}).then(function() {
              scope.fullscreen = false;
              scope.media.splice(scope.media.indexOf(image), 1);
            });
          }
        };

        scope.selectImage = function(e, item) {
          // If image is not selected
          if(!!scope.multiple) { scope.selectedImages = []; };
          if(scope.selectedImages.indexOf(item) === -1) {
            scope.selectedImages.push(item);
          } else {
            scope.selectedImages.splice(scope.selectedImages.indexOf(item), 1);
          }
        };

        scope.getSelectedImages = function() {
          if(!!scope.multiple) {
            return scope.selectedImages[0];
          } else {
            return scope.selectedImages;
          }
        };

        // Gets images that were selected when the directive was created or was updated by cms.saveEdits
        scope.getInitialImages = function() {
          var gettingInitialImages = [];
          for (var i = 0; i < scope.media.length; i++) {
            if(scope.longTermSelection.indexOf(scope.media[i].url) > -1) {
              gettingInitialImages.push(scope.media[i]);
            }
          };
          return gettingInitialImages;
        };

        // If "choose images" was clicked then we want to remember that selection next time the overlay opens
        scope.rememberSelection = function() {
          saveSelection('shortTermSelection');
          return scope.shortTermSelection;
        };

        // Unless "close" was clicked then we should forget any selection changes that were made
        scope.forgetSelection = function() {
          resetToSelection('shortTermSelection');
          return scope.shortTermSelection;
        };

        scope.publishSelected = function() {
          var imageArray = [];

          // Get the visibile images' urls
          for (var i = 0; i < scope.selectedImages.length; i++) {
            scope.selectedImages[i].galleries.push(scope.gallerySlug);
            imageArray.push(scope.selectedImages[i].url);
          };

          saveSelection('longTermSelection');
          saveSelection('shortTermSelection');

          if(imageArray.length < 1) return false;

          // Remove this gallery slug from all the images that use it and then add it back to the appropriate images
          // This strategy is quicker than checking which ones were added and removed
          media.update({galleries: scope.gallerySlug}, { $pull: {galleries: scope.gallerySlug} }).finally(function() {
            media.update({ url: {$in: imageArray } }, { $push: {galleries: scope.gallerySlug} });
          });
        };

        // Add the gallery slug to the selected images and send updates to server database
        // scope.saveSelectedToGallery = function() {
        //   if(scope.gallerySlug) {
        //     var urlArray = [];

        //     // Get the visibile images' urls
        //     for (var i = 0; i < scope.selectedImages.length; i++) {
        //       scope.selectedImages[i].galleries.push(scope.gallerySlug);
        //       urlArray.push(scope.selectedImages[i].url);
        //     };

        //     saveSelection('longTermSelection');
        //     saveSelection('shortTermSelection');

        //     if(urlArray.length < 1) return false;

        //     // Remove this gallery slug from all the images that use it and then add it back to the appropriate images
        //     // This strategy is quicker than checking which ones were added and removed
        //     media.update({galleries: scope.gallerySlug}, { $pull: {galleries: scope.gallerySlug} }).then(function() {
        //       media.update({ url: {$in: urlArray } }, { $push: {galleries: scope.gallerySlug} });
        //     });
        //   }
        // };

        // Clean up our event listeners when we leave this page
        scope.$on('$destroy', function() {
          dom.mainFullsizeBox.unbind('transitionend', switchImages);
        });
      }
    };
  });