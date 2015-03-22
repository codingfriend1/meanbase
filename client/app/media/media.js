'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.media', {
        url: '/media',
        templateUrl: 'app/media/media.html',
        controller: 'MediaCtrl',
        authenticate: true
      });
  });