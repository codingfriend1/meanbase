'use strict';

angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints, FileUploader, $cookieStore, $rootScope, toastr, api, $timeout, crud) {

    $scope.$parent.pageTitle = 'Themes';

    $scope.t = new crud($scope, 'themes', api.themes);

    $scope.t.find({}, null, 'Could not get the themes').then(function(response) {
      for (var i = 0; i < $scope.themes.length; i++) {
          if(!$scope.themes[i].preview) {
            $scope.themes[i].preview = 'http://placehold.it/500x300';
          }
        }
    }, function(err) {
      console.log('promise rejected', err);
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

    $scope.saveSettings = function(theme, settings) {
      if(theme && theme._id) {
        $scope.t.update(theme, settings, theme.title + ' updated', 'Could not update ' + theme.title);
      } else if(theme && !theme._id) {
        $scope.t.create(theme, theme.title + ' created', 'Could not create ' + theme.title).then(function(response) {
          $timeout(function() {
            componentHandler.upgradeAllRegistered()
          });
        });
      }

      $scope.t.toggleModal('isSettingsOpen', 'settings');
  	};

    $scope.deleteTheme = function(theme) {
      var message = theme.title + " deleted";
      var failure = 'Could not delete ' + theme.title;
      $scope.t.delete(theme, theme.title + ' unpublished.', message, failure);
      $scope.t.toggleModal('isSettingsOpen');
  	};

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
  });
