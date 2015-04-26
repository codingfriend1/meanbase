'use strict';

angular.module('meanbaseApp')
  .controller('MediaCtrl', function ($scope, endpoints, $modal, FileUploader, $timeout, $cookieStore) {

    $scope.$parent.pageTitle = 'Upload and edit media';

    
    var endpoint = new endpoints('media');
    $scope.groups = ['all'];

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
      getMedia();
      $scope.uploader.progress = 0;
    };

    function getMedia() {
       endpoint.find({}).success(function(media) {
        $scope.media = media;

        // Take the image path from the server and choose the appropriate image to display
        for (var i = 0; i < $scope.media.length; i++) {
          $scope.media[i].modifiedurl = $scope.media[i].url + 'origional.jpg';
        };

        // Get media groups
        for (var i = 0; i < $scope.media.length; i++) { //Loop through each media
          for (var x = 0; x < $scope.media[i].groups.length; x++) { //Loop through each group in media
            if($scope.groups.indexOf($scope.media[i].groups[x]) === -1) { //Already exists?
              $scope.groups.push($scope.media[i].groups[x]); //else add to groups array
            }
          }
        }

      }); //Find All Media
    }

    $scope.deleteAllVisible = function() {
      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < $scope.filteredMedia.length; i++) {
        urlArray.push($scope.filteredMedia[i].url);
      };

      // Delete those images
      endpoint.delete({ url: {$in: urlArray } }).then(function() {
        for (var i = 0; i < $scope.filteredMedia.length; i++) {
          $scope.media.splice($scope.media.indexOf($scope.filteredMedia[i]), 1);
        }
      });
    };

    $scope.deleteSelected = function() {
      var selectedImages = angular.element('image-selector').scope().getSelectedImages();
      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < $scope.selectedImages.length; i++) {
        urlArray.push($scope.selectedImages[i].url);
      };

      // Delete those images
      endpoint.delete({ url: {$in: urlArray } }).then(function() {
        for (var i = 0; i < $scope.selectedImages.length; i++) {
          $scope.media.splice($scope.media.indexOf($scope.selectedImages[i]), 1);
        }
      });
    };

    getMedia();
  });
