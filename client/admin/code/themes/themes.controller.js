'use strict';

angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints, FileUploader, $cookieStore, $rootScope, toastr, api) {

    $scope.$parent.pageTitle = 'Themes';

    $scope.themeDevelopmentMode = false;
    api.developmentMode.find({}).success(function(response) {
      $scope.themeDevelopmentMode = response;
    });


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
      api.themes.find({}).success(function(themes) {
        $scope.themes = themes;
      });
    };

    uploader.onErrorItem = function(item, response, status, headers) {
      toastr.error("Could not upload theme. " + status + ": " + response);
    };

    api.themes.find({}).success(function(themes) {
    	$scope.themes = themes;
      for (var i = 0; i < $scope.themes.length; i++) {
        if(!$scope.themes[i].preview) {
          $scope.themes[i].preview = 'http://placehold.it/500x300';
        }
      }
      $timeout(function() {
        componentHandler.upgradeAllRegistered()
      }, 0);
    });

    $scope.switchModes = function() {
      api.developmentMode.create({theme: $scope.themeDevelopmentMode}).then(function() {
        if($scope.themeDevelopmentMode) {
          toastr.success("Meanbase is now watching the active theme's scripts.html and styles.html for changes.")
        } else {
          toastr.warning('Meanbase is no longer watching for changes in scripts and styles html.');
        }
      });
    };

    $scope.$onRootScope('deleted theme', function(theme) {
      $scope.themeDevelopmentMode = false;
    });

    $scope.$onRootScope('activated theme', function(theme) {
      $scope.themeDevelopmentMode = false;
    });
  });
