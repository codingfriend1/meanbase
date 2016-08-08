'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.users', {
        url: '/users',
        templateUrl: require('./users.jade'),
        controller: 'UsersCtrl',
        controllerAs:'stateCtrl',
        hasPermission: 'manageUsers',
        icon: 'people'
      });
  });
