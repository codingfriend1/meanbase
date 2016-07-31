'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.missing', {
        url: '/missing',
        templateUrl: 'app/missing/missing.html',
        controller: 'MissingCtrl'
      });
  });