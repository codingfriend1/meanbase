angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.media', {
        url: '/media',
        templateUrl: require('./media.jade'),
        controller: 'MediaCtrl',
        hasPermission: 'manageMedia',
        icon: 'images'
      });
  });
