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
  });
