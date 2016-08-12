'use strict';

angular.module('meanbaseApp')
  .controller('MediaCtrl', function ($scope, endpoints, FileUploader, $timeout, $cookieStore, $rootScope, toastr, Auth) {

    $scope.$parent.pageTitle = 'Upload images';
    $scope.media = [];
    // $scope.allOperations = true;

    $scope.imageSelectorConfig = {
      multiple: true,
      allOperations: true
    };

    if (Auth.getToken()) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/image-uploads',
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          autoUpload: true
      });
    }

    var err = null;

    uploader.onCompleteAll = function(res) {
      console.log("res", res);
      if(err) {
        toastr.error('Failed to upload');
      } else {
        toastr.success('Successfully uploaded');
      }
      uploader.clearQueue()
    };

    uploader.onCompleteItem = function(res) {
      err = res.isError;
      $rootScope.$emit('cms.imagesUploaded');
    };
  });
