'use strict';

angular.module('meanbaseApp')
  .directive('imageSelector', function (Cropper, endpoints, $compile, $timeout) {
    return {
      templateUrl: 'components/image-selector/image-selector.html',
      restrict: 'EA',
      // scope: {
      //   multiple:"=",
          // gallerySlug:"="
      // },
      link: function (scope, element, attrs) {

        var media = new endpoints('media');
        scope.fullscreen = false;
        scope.selectedGroup = scope.groups[0];
        scope.selectedImages = [];

        scope.groups = ['all', 'selected'];
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

        media.find({}).success(function(media) {
          scope.media = media;

          // Take the image path from the server and choose the appropriate image to display
          for (var i = 0; i < scope.media.length; i++) {
            scope.media[i].modifiedurl = scope.media[i].url + 'origional.jpg';
          };

          getGroups();

        }); //Find All Media

        // Sets up fields to search by
        scope.mediaFilter = '';
        scope.filterMedia = function(media) {
          return (media.url + media.alt + media.attribute + media.groups.toString()).toLowerCase().indexOf(scope.mediaFilter.toLowerCase()) >= 0;
        };

        scope.filterByAlbum = function(media) {
          if(scope.selectedGroup === 'all') return true;
          if(scope.selectedGroup === 'selected' && scope.selectedImages.indexOf(media) > -1) { return true; }
          return media.groups.indexOf(scope.selectedGroup) >= 0;
        };


        // Stores all elements in the dom object
        var dom = {
          fullscreenContainer: angular.element('.fullscreen-master-container'),
          mainFullsizeBox: angular.element('.fullsize-box.main'),
          nextImageTag: null,
          previousImageTag: null
        };

        // This isn't site wide globals just globals to this file
        var globals = {
          direction: '',
          nextImage: null,
          previousImage: null,
          fullsizeImageIndex: null,
          _fullscreenImage: null
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

        scope.expand = function($event, image, $index) {

          // Store the index position of the fullscreen image
          globals.fullsizeImageIndex = $index;

          // Set the fullscreen image to the image that was clicked on
          scope.fullscreenImage = angular.element($event.target).scope().item;

          scope.firstImageUrl = scope.fullscreenImage.modifiedurl;

          $compile(dom.mainFullsizeBox)(scope);
          globals._fullscreenImage = angular.copy(scope.fullscreenImage);

          if(scope.fullscreen === false) {
            scope.fullscreen = true;
          } else {
            // To Do: Have clicking the image select it
          }
        };

        scope.exitFullscreen = function() {
          saveImageEdits();
          scope.fullscreen = false;
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
          if(scope.selectedImages.indexOf(item) === -1) {
            scope.selectedImages.push(item);
          } else {
            scope.selectedImages.splice(scope.selectedImages.indexOf(item), 1);
          }
        };

        scope.getSelectedImages = function() {
          return scope.selectedImages;
        };

        // Add the gallery slug to the selected images
        scope.saveSelectedToGallery = function() {
          if(scope.gallerySlug) {
            var urlArray = [];

            // Get the visibile images' urls
            for (var i = 0; i < $scope.selectedImages.length; i++) {
              $scope.selectedImages[i].galleries.push(scope.gallerySlug);
              urlArray.push($scope.selectedImages[i].url);
            };

            if(urlArray.length < 1) return false;

            // Add the gallery name to those images
            endpoint.update({ url: {$in: urlArray } }, { $push: {galleries: scope.gallerySlug} });
          }
        };

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
          dom.nextImageTag = angular.element('<div class="fullsize-box right"><img ng-src="' + scope.fullscreenImage.modifiedurl + '" class="fullscreen-image"></div>');
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
          dom.previousImageTag = angular.element('<div class="fullsize-box left"><img ng-src="' + scope.fullscreenImage.modifiedurl + '" class="fullscreen-image"></div>');
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

        // Clean up our event listeners when we leave this page
        scope.$on('$destroy', function() {
          dom.mainFullsizeBox.unbind('transitionend', switchImages);
        });
      }
    };
  });