'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.media', {
        url: '/media',
        template: require('./media.jade'),
        controller: 'MediaCtrl',
        hasPermission: 'manageMedia',
        icon: 'fa-image'
      });
  });
