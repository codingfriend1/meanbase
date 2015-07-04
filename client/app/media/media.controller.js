'use strict';

angular.module('meanbaseApp')
  .controller('MediaCtrl', function ($scope, endpoints, $modal, FileUploader, $timeout, $cookieStore, $rootScope, toastr) {

    $scope.$parent.pageTitle = 'Upload and edit media';

    
    var endpoint = new endpoints('media');
    $scope.media = [];
    // $scope.allOperations = true;

    $scope.imageSelectorConfig = {
      multiple: true,
      allOperations: true
    };

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
      toastr.success('Images successfully uploaded');
      uploader.clearQueue()
    };

    uploader.onCompleteItem = function() {
      $rootScope.$emit('cms.imagesUploaded');
    };
  });
