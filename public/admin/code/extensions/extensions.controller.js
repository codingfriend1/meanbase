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
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          autoUpload: true
      });

      uploader.onCompleteAll = function(e) {
        uploader.clearQueue();

        findAll();
      };

      uploader.onSuccessItem = function(event, response) {
        toastr.success('Extension successfully uploaded');
        $rootScope.$emit('cms.extensionUploaded');
      };

      uploader.onErrorItem = function(data, response, status, headers) {
        console.log("data", data);
        console.log('Error uploading extension: ', response);
        toastr.error("Could not upload extension. " + response.message);
      };
    }

    $scope.deleteExtension = function(extension) {
      var message = 'Deleted ' + extension.label + ' extension.';
      var failure = 'Could not delete ' + extension.label;
      api.extensions.delete({folder: extension.folder}, message, failure).then(function(response) {

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
    //         toastr.warning('"' + extension.label + '" will not longer be useable in your site.')
    //       } else {
    //         toastr.success('"' + extension.label + '" can now be used across your site.');
    //       }
    //     });
    //   }
    // };

    $scope.toggleEnabled = function(extension) {
      extension.active = !extension.active;
      var message = extension.active? '"' + extension.label + '" can now be used across your site.': '"' + extension.label + '" will not longer be useable in your site.';
      var failure = extension.active? 'Could not enable ' + extension.label: 'Could not disable ' + extension.label;

      $scope.e.update(extension, {active: extension.active}, message, failure);
  	};

    $scope.filterExtensions = function(extension) {
      return extension.label.toLowerCase().indexOf($rootScope.searchText.toLowerCase()) >= 0;
    };

  });
