'use strict';

angular.module('meanbaseApp')
  .controller('ExtensionsCtrl', function ($modal, $scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope) {
    $scope.$parent.pageTitle = 'Extensions';

    var extensions = new endpoints('extension');

    if ($cookieStore.get('token')) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/extension/upload',
          headers: {
            'Authorization': 'Bearer ' + $cookieStore.get('token')
          },
          autoUpload: true
      });
    }

    extensions.find({}).success(function(response) {
      $scope.extensions = response;
      console.log("response", response);
    });


    uploader.onCompleteAll = function(e) {
      uploader.clearQueue();
    };

    uploader.onSuccessItem = function() {
      $rootScope.$emit('cms.extensionUploaded');
      toastr.success('Extension successfully uploaded! Refreshing page to compile code.');
    };

    uploader.onErrorItem = function(item, response, status, headers) {
      toastr.error("Could not upload extension. " + status + ": " + response);
    };

    $scope.deleteExtension = function(extension) {
      if(extension._id) {
        var sure = window.confirm('Are you sure you want to delete this extension?');
        if(sure) {
          extensions.delete({folderName: extension.folderName}).then(function(response) {
            toastr.success('Deleted ' + extension.name + ' extension.');
            $scope.extensions.splice($scope.extensions.indexOf(extension), 1);
          });
        }
      }
    };

  });
