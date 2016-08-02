'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.themes', {
        url: '/themes',
        template: require('./themes.jade'),
        controller: 'ThemesCtrl',
        hasPermission: 'changeSiteSettings',
        icon: 'fa-paint-brush'
      });
  });
