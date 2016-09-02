

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.missing', {
        url: '/missing',
        templateUrl: require('./missing.jade'),
        controller: 'MissingCtrl'
      });
  });
