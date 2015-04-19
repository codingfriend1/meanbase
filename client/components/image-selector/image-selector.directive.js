'use strict';

angular.module('meanbaseApp')
  .directive('imageSelector', function (Cropper, endpoints) {
    return {
      templateUrl: 'components/image-selector/image-selector.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        var media = new endpoints('media');

        scope.fullscreen = false;

        scope.selectedGroup = scope.groups[0];

        scope.mediaFilter = '';
        scope.filterMedia = function(media) {
          return (media.url + media.alt + media.attribute + media.groups.toString()).toLowerCase().indexOf(scope.mediaFilter.toLowerCase()) >= 0;
        };

        function saveImageEdits() {
          if(!scope.fullscreenImage || !scope.fullscreenImage._id) return false;

            // console.log("_fullscreenImage.caption === scope.fullscreenImage.caption", _fullscreenImage.caption === scope.fullscreenImage.caption);
            // console.log("_fullscreenImage.attribute === scope.fullscreenImage.attribute", _fullscreenImage.attribute === scope.fullscreenImage.attribute);
            // // scope.fullscreenImage.groups.sort().join(',') === _fullscreenImage.groups.sort().join(',')
            // console.log("scope.fullscreenImage.groups.sort().join(',') === _fullscreenImage.groups.sort().join(',')", scope.fullscreenImage.groups.sort().join(',') === _fullscreenImage.groups.sort().join(','));

            if(_fullscreenImage.alt === scope.fullscreenImage.alt && _fullscreenImage.attribute === scope.fullscreenImage.attribute && scope.fullscreenImage.groups.sort().join(',') === _fullscreenImage.groups.sort().join(',')) {
              return false;
            }
          media.update({_id: scope.fullscreenImage._id}, scope.fullscreenImage);
        }

        var expandedImage, fullsizeImageIndex, _fullscreenImage;
        scope.expand = function($event, image, $index) {

          // Store the index position of the fullscreen image
          fullsizeImageIndex = $index;

          // Get the image that was clicked on
          expandedImage = angular.element($event.target);

          // Set the fullscreen image to that clicked image
          scope.fullscreenImage = expandedImage.scope().item;
          _fullscreenImage = angular.copy(scope.fullscreenImage);

          if(scope.fullscreen === false) {
            scope.fullscreen = true;
          } else {
            // var selector = expandedImage.next();
            // if(image.selected) {
            //   selector.addClass('fa-check-circle-o');
            //   selector.removeClass('fa-circle-o');
            //   image.selected = false;
            // } else {
            //   selector.removeClass('fa-check-circle-o');
            //   selector.addClass('fa-circle-o');
            //   image.selected = true;
            // }
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

        scope.select = function($event, image) {
          if(image.selected) {
            angular.element($event.target).addClass('fa-check-circle-o');
            angular.element($event.target).removeClass('fa-circle-o');
            image.selected = false;
          } else {
            angular.element($event.target).removeClass('fa-check-circle-o');
            angular.element($event.target).addClass('fa-circle-o');
            image.selected = true;
          }
        };

        // Slide to the next image
        scope.next = function() {
          saveImageEdits();

          // Check if we are at the end of beginning of the images and so move the index to the beginning
          if(fullsizeImageIndex >= scope.media.length-1) {
            fullsizeImageIndex = -1;
          }

          // Using the index of the currently viewed image, find the image that comes afterwards
          expandedImage = angular.element('.image-thumbnail').eq(fullsizeImageIndex + 1).find('img');

          // Set the fullscreen image to this new image so it displays
          scope.fullscreenImage = expandedImage.scope().item;
          _fullscreenImage = angular.copy(scope.fullscreenImage);

          // Increase the current index
          fullsizeImageIndex++;
        };

        // Slide to the previous image
        scope.prev = function() {
          saveImageEdits();

          if(fullsizeImageIndex <= 0) {
            fullsizeImageIndex = scope.media.length;
          }
          expandedImage = angular.element('.image-thumbnail').eq(fullsizeImageIndex - 1).find('img');
          scope.fullscreenImage = expandedImage.scope().item;
          _fullscreenImage = angular.copy(scope.fullscreenImage);
          fullsizeImageIndex--;
        };
      }
    };
  });