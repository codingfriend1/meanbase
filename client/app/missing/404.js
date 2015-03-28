'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.missing', {
        url: '/404',
        templateUrl: 'app/404/404.html',
        controller: '404Ctrl'
      });
  });