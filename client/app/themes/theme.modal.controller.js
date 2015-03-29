'use strict';

angular.module('meanbaseApp')
  .controller('theme.modal.controller', function ($scope, theme, $modalInstance, $http, endpoints) {

    $scope.theme = theme;

    var themes = new endpoints('themes');

    $scope.templates = $scope.theme.templates;


    $scope.ok = function () {
      $modalInstance.close($scope.theme);
    };

    $scope.activateTheme = function() {
      $modalInstance.close($scope.theme);
      $http.post('api/themes/activate', {id: $scope.theme._id}).then(function(theme) {
        var reload = confirm('Themes changed please reload the page.');
        if(reload) {
          location.reload();
        }
      }, function(error) {
        console.log('Switching themes error: ', error);
      });
    };

    $scope.updateTheme = function() {
      $modalInstance.close($scope.theme);
      if(!$scope.theme._id) { return false; }
      themes.update({_id: $scope.theme._id}, $scope.theme).then(function(response) {
        console.log('response', response);
      });
    };

    $scope.deleteTheme = function() {
      $modalInstance.close($scope.theme);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
