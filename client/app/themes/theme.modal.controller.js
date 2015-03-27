'use strict';

angular.module('meanbaseApp')
  .controller('theme.modal.controller', function ($scope, theme, $modalInstance, $http) {

    $scope.theme = theme;

    $scope.ok = function () {
      $modalInstance.close(theme);
    };

    $scope.activateTheme = function() {
      $modalInstance.close(theme);
      $http.post('api/themes/activate', {id: theme._id}).then(function(theme) {
        var reload = confirm('Themes changed please reload the page.');
        if(reload) {
          location.reload();
        }
      }, function(error) {
        console.log('Switching themes error: ', error);
      });
    };

    $scope.updateTheme = function() {
      $modalInstance.close(theme);
    };

    $scope.deleteTheme = function() {
      $modalInstance.close(theme);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
