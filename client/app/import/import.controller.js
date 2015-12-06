'use strict';

angular.module('meanbaseApp')
  .controller('ImportCtrl', function($modal, $scope, endpoints, FileUploader, $cookieStore, toastr, $rootScope) {
    $scope.$parent.pageTitle = 'Import Data from Wordpress';

    if ($cookieStore.get('token')) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/import',
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
      toastr.success('Data successfully imported. Check out your new content!');
    };

    uploader.onErrorItem = function(item, response, status, headers) {
      toastr.error("Sorry, we could not import that data.");
    };

  });
