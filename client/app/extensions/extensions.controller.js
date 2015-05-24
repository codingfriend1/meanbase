'use strict';

angular.module('meanbaseApp')
  .controller('ExtensionsCtrl', function ($scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope) {
    $scope.$parent.pageTitle = 'Extensions';

    var extension = new endpoints('extension');

    if ($cookieStore.get('token')) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/extension/upload',
          headers: {
            'Authorization': 'Bearer ' + $cookieStore.get('token')
          },
          autoUpload: true
      });
    }

    uploader.onCompleteAll = function(e) {
      uploader.clearQueue();
    };

    uploader.onSuccessItem = function() {
      $rootScope.$emit('cms.extensionUploaded');
      toastr.success('Extension successfully uploaded! Refreshing page to compile code.');
    };

    uploader.onErrorItem = function(e) {
      toastr.error("Hmmmm, it seems the extension could not be uploaded. Try checking the extension.json file to see if it's valid.", e);
    };
  });
