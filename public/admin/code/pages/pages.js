angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.pages', {
        url: '/pages',
        templateUrl: require('./pages.jade'),
        controller: 'PagesCtrl',
        hasPermission: 'editContent',
        icon: 'web_asset'
      });
  });
