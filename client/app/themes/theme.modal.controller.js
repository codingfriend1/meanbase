'use strict';

angular.module('meanbaseApp')
  .controller('theme.modal.controller', function ($scope, theme, $modalInstance, $http) {

    $scope.theme = theme;

    $scope.ok = function () {
      $modalInstance.close(theme);
    };

    $scope.activateTheme = function() {
      $modalInstance.close(theme);
      console.log('id', theme._id);
      $http.post('api/themes/activate', {id: theme._id}).then(function(theme) {
        console.log('theme activated', theme);
      }, function(error) {
        console.log('error', error);
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
