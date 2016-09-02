angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.themes', {
        url: '/themes',
        templateUrl: require('./themes.jade'),
        controller: 'ThemesCtrl',
        hasPermission: 'changeSiteSettings',
        icon: 'settings'
      });
  });
