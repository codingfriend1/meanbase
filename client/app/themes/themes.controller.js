'use strict';

angular.module('meanbaseApp')
  .controller('ThemesCtrl', function ($scope, endpoints) {
    $scope.message = 'Hello';
    var endpoint = new endpoints('themes');

    endpoint.find({}).success(function(themes) {
    	$scope.themes = themes;
    });
  });
