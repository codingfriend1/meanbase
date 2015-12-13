'use strict';

angular.module('meanbaseApp')
  .controller('MediaCtrl', function ($scope, endpoints, $modal, FileUploader, $timeout, $cookieStore, $rootScope, toastr) {

    $scope.$parent.pageTitle = 'Upload and edit media';
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

    var err = null;

    uploader.onCompleteAll = function(res) {
      if(err) {
        toastr.error('Failed to upload');
      } else {
        toastr.success('Successfully uploaded');
      }
      uploader.clearQueue()
    };

    uploader.onCompleteItem = function(res) {
      console.log("res", res);
      err = res.isError;
      $rootScope.$emit('cms.imagesUploaded');
    };
  });
