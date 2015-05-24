'use strict';

angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints, $modal, FileUploader, $cookieStore, $rootScope) {

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

    uploader.onCompleteAll = function() {
      uploader.clearQueue()
    };

    uploader.onCompleteItem = function() {
      $rootScope.$emit('cms.themeUploaded');
      endpoint.find({}).success(function(themes) {
        $scope.themes = themes;
      });
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
