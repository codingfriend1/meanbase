'use strict';

angular.module('meanbaseApp')
  .controller('ExtensionsCtrl', function ($scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope, api, crud, Auth) {
    $scope.$parent.pageTitle = 'Extensions';

    $scope.e = new crud($scope, 'extensions', api.extensions);

    function findAll() {
      $scope.e.find({}, null, 'Could not get the extensions').then(function(response) {
        for (var i = 0; i < $scope.extensions.length; i++) {
            if(!$scope.extensions[i].preview) {
              $scope.extensions[i].preview = 'http://placehold.it/500x300';
            }
          }
      }, function(err) {
        console.log('promise rejected', err);
      });
    }
    findAll();

    if (Auth.getToken()) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/extension-uploads',
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken
          },
          autoUpload: true
      });

      uploader.onCompleteAll = function(e) {
        uploader.clearQueue();
        toastr.success('Extensions successfully uploaded!');
        findAll();
      };

      uploader.onSuccessItem = function() {
        $rootScope.$emit('cms.extensionUploaded');
      };

      uploader.onErrorItem = function(item, response, status, headers) {
        toastr.error("Could not upload extension. " + status + ": " + response);
      };
    }

    $scope.deleteExtension = function(extension) {
      var message = 'Deleted ' + extension.name + ' extension.';
      var failure = 'Could not delete ' + extension.name;
      api.extensions.delete({folderName: extension.folderName}, message, failure).then(function(response) {

        for (var i = 0; i < $scope.extensions.length; i++) {
          if($scope.extensions[i]._id === extension._id) {
            $scope.extensions.splice(i, 1);
          }
        }

        toastr.clear(); toastr.success(message);
      }, function(err) {
        toastr.clear(); toastr.warning(message);
      });
      $scope.e.toggleModal('isDeleteOpen', 'extensionToDelete');
  	};

    // $scope.toggleEnabled = function(extension) {
    //   extension.active = !extension.active;
    //   if(extension._id) {
    //     api.extensions.update({_id: extension._id}, {active: extension.active}).then(function(response) {
    //       toastr.clear();
    //       if(!extension.active) {
    //         toastr.warning('"' + extension.name + '" will not longer be useable in your site.')
    //       } else {
    //         toastr.success('"' + extension.name + '" can now be used across your site.');
    //       }
    //     });
    //   }
    // };

    $scope.toggleEnabled = function(extension) {
      extension.active = !extension.active;
      var message = extension.active? '"' + extension.name + '" can now be used across your site.': '"' + extension.name + '" will not longer be useable in your site.';
      var failure = extension.active? 'Could not enable ' + extension.name: 'Could not disable ' + extension.name;

      $scope.e.update(extension, {active: extension.active}, message, failure);
  	};

    $scope.filterExtensions = function(extension) {
      return extension.name.toLowerCase().indexOf($rootScope.searchText.toLowerCase()) >= 0;
    };

  });
