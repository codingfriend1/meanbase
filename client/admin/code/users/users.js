'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.users', {
        url: '/users',
        template: require('./users.jade'),
        controller: 'UsersCtrl',
        controllerAs:'stateCtrl',
        hasPermission: 'manageUsers',
        icon: 'fa-users'
      });
  });
