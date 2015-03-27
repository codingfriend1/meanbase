'use strict';

angular.module('meanbaseApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.page = window.meanbaseGlobals.page;
  });
