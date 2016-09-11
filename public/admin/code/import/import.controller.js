angular.module('meanbaseApp')
  .controller('ImportCtrl', function($scope, endpoints, FileUploader, Auth, toastr, $rootScope, $window, $http) {
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

    if (Auth.getToken()) {
      var uploader2 = $scope.uploader2 = new FileUploader({
          url: `/api/import-export?includeUsersAndRoles=${$scope.includeUsersAndRoles || false}`,
          headers: {
            'Authorization': 'Bearer ' + Auth.getToken()
          },
          autoUpload: true
      });
    }

    uploader2.onBeforeUploadItem = function(item) {
      item.url = `/api/import-export?includeUsersAndRoles=${$scope.includeUsersAndRoles || false}`
    }

    uploader2.onCompleteAll = function(e) {
      uploader2.clearQueue();
    };

    uploader2.onSuccessItem = function() {
      toastr.success('Data successfully imported. Checkout your site.');
    };

    uploader2.onErrorItem = function(item, response, status, headers) {
      toastr.error("Error importing meanbase data. " + response.message);
    };

    $scope.downloadSiteData = function() {
      toastr.success('Collecting images, extensions, themes, and data from your site. The download will appear in a minute.')
      var url = `/api/import-export`;
      var filename = 'site_data.zip';
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'blob';
      request.setRequestHeader("Authorization", Auth.getToken());
      request.onload = function() {
         var link = document.createElement('a');
         document.body.appendChild(link);
         link.href = window.URL.createObjectURL(request.response);
         link.download = filename;
         link.click();
      };
      request.send();
    }

  });
