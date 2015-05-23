'use strict';

angular.module('meanbaseApp')
  .controller('MediaCtrl', function ($scope, endpoints, $modal, FileUploader, $timeout, $cookieStore, $rootScope) {

    $scope.$parent.pageTitle = 'Upload and edit media';

    
    var endpoint = new endpoints('media');
    $scope.groups = ['all', 'selected'];
    $scope.media = [];

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
      uploader.clearQueue()
    };

    uploader.onCompleteItem = function() {
      $rootScope.$emit('cms.imagesUploaded');
    };

    function getGroups() {
      // Get media groups
      for (var i = 0; i < $scope.media.length; i++) { //Loop through each media
        for (var x = 0; x < $scope.media[i].groups.length; x++) { //Loop through each group in media
          if($scope.groups.indexOf($scope.media[i].groups[x]) === -1) { //Already exists?
            $scope.groups.push($scope.media[i].groups[x]); //else add to groups array
          }
        }
      }
    }

    // function getMedia() {
    //    endpoint.find({}).success(function(media) {
    //     $scope.media = media;

    //     // Take the image path from the server and choose the appropriate image to display
    //     for (var i = 0; i < $scope.media.length; i++) {
    //       $scope.media[i].modifiedurl = $scope.media[i].url + 'origional.jpg';
    //     };

    //     getGroups();

    //   }); //Find All Media
    // }

    $scope.deleteAllVisible = function() {
      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < $scope.filteredMedia.length; i++) {
        urlArray.push($scope.filteredMedia[i].url);
      };

      if(urlArray.length < 1) return false;

      // Delete those images
      endpoint.delete({ url: {$in: urlArray } }).then(function() {
        for (var i = 0; i < $scope.filteredMedia.length; i++) {
          $scope.media.splice($scope.media.indexOf($scope.filteredMedia[i]), 1);
        }
      });
    };

    $scope.deleteSelected = function() {
      var selectedImages = angular.element('image-selector').isolateScope().getSelectedImages();
      var urlArray = [];

      if(!angular.isArray(selectedImages)) {
        selectedImages = [selectedImages];
      }

      // Get the visibile images' urls
      for (var i = 0; i < selectedImages.length; i++) {
        urlArray.push(selectedImages[i].url);
      };

      if(urlArray.length < 1) return false;

      // Delete those images
      endpoint.delete({ url: {$in: urlArray } }).then(function() {
        for (var i = 0; i < selectedImages.length; i++) {
          $scope.media.splice($scope.media.indexOf(selectedImages[i]), 1);
        }
      });
    };

    $scope.groupSelected = function() {
      var prompt = window.prompt('Album Name?');
      var re = new RegExp("[_a-zA-Z0-9\\-\\.]+");

      if(!prompt || !re.test(prompt)) return false;

      var imageSelector = angular.element('image-selector').isolateScope()

      var selectedImages = imageSelector.getSelectedImages();

      if(!angular.isArray(selectedImages)) {
        selectedImages = [selectedImages];
      }

      var urlArray = [];

      // Get the visibile images' urls
      for (var i = 0; i < selectedImages.length; i++) {
        urlArray.push(selectedImages[i].url);
      };

      if(urlArray.length < 1) return false;

      // Update those images
      endpoint.update({ url: {$in: urlArray } }, { $push: {groups: prompt} }).then(function() {
        for (var i = 0; i < selectedImages.length; i++) {
          selectedImages[i].groups.push(prompt);
          getGroups();
          imageSelector.selectedGroup = prompt;
        }
      });

    };

    // getMedia();
  });
