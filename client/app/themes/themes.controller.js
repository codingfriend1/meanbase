'use strict';

angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints, $modal) {
    $scope.message = 'Hello';
    var endpoint = new endpoints('themes');

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
    };
  });
