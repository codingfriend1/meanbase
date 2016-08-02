'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.missing', {
        url: '/missing',
        template: require('./missing.jade'),
        controller: 'MissingCtrl'
      });
  });
