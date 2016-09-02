angular.module('meanbaseApp')
  .controller('ImportCtrl', function($scope, endpoints, FileUploader, Auth, toastr, $rootScope) {

    $scope.$parent.pageTitle = 'Import Data from Wordpress';

    if (Auth.getToken()) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/wordpress-import',
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          autoUpload: true
      });
    }


    uploader.onCompleteAll = function(e) {
      uploader.clearQueue();
    };

    uploader.onSuccessItem = function() {
      toastr.success('Data successfully imported. Make sure to add the "post" and "page" template names to your theme templates.');
    };

    uploader.onErrorItem = function(item, response, status, headers) {
      toastr.error("Error importing data from wordpress. " + response.message);
    };

  });
