'use strict';

angular.module('meanbaseApp')
  .controller('ExtensionsCtrl', function ($scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope, api, crud) {
    $scope.$parent.pageTitle = 'Extensions';

    $scope.e = new crud($scope, 'extensions', api.extensions);

    $scope.e.find({}, null, 'Could not get the extensions').then(function(response) {
      for (var i = 0; i < $scope.extensions.length; i++) {
          if(!$scope.extensions[i].preview) {
            $scope.extensions[i].preview = 'http://placehold.it/500x300';
          }
        }
    }, function(err) {
      console.log('promise rejected', err);
    });

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

    uploader.onErrorItem = function(item, response, status, headers) {
      toastr.error("Could not upload extension. " + status + ": " + response);
    };

    $scope.deleteExtension = function(extension) {
      if(extension._id) {
        var sure = window.confirm('Are you sure you want to delete this extension?');
        if(sure) {
          api.extensions.delete({folderName: extension.folderName}).then(function(response) {
            toastr.success('Deleted ' + extension.name + ' extension.');
            $scope.extensions.splice($scope.extensions.indexOf(extension), 1);
          });
        }
      }
    };

    $scope.toggleEnabled = function(extension) {
      extension.active = !extension.active;
      if(extension._id) {
        api.extensions.update({_id: extension._id}, {active: extension.active}).then(function(response) {
          toastr.clear();
          if(!extension.active) {
            toastr.warning('"' + extension.name + '" will not longer be useable in your site.')
          } else {
            toastr.success('"' + extension.name + '" can now be used across your site.');
          }
        });
      }
    };

    $scope.filterExtensions = function(extension) {
      return extension.name.toLowerCase().indexOf($rootScope.searchText.toLowerCase()) >= 0;
    };

  });
