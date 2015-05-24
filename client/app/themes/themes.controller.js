'use strict';

angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints, $modal, FileUploader, $cookieStore, $rootScope, toastr) {

    $scope.$parent.pageTitle = 'Themes';

    var endpoint = new endpoints('themes');

    if ($cookieStore.get('token')) {
      var uploader = $scope.uploader = new FileUploader({
          url: '/api/themes/upload',
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
      $rootScope.$emit('cms.themeUploaded');
      toastr.success('Theme successfully uploaded! Refreshing page to compile code.');
      endpoint.find({}).success(function(themes) {
        $scope.themes = themes;
      });
    };

    uploader.onErrorItem = function(e) {
      toastr.error("Hmmmm, it seems the theme could not be uploaded. Try checking the theme.json file to see if it's valid.", e);
    };

    endpoint.find({}).success(function(themes) {
    	$scope.themes = themes;
    });

    $scope.openModal = function (theme) {
      var modalInstance = $modal.open({
        templateUrl: 'theme.modal.html',
        controller: 'theme.modal.controller',
        size: 'lg',
        resolve: {
          theme: function () {
            return theme;
          }
        }
      });

      modalInstance.result.then(function (action) {
        if(action === 'deleted') {
          $scope.themes.splice($scope.themes.indexOf(theme), 1);
        }
      });
    };
  });
