'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.account', {
        url: '/account',
        templateUrl: require('./login/login.jade'),
        controller: 'LoginCtrl',
        icon: 'assignment_ind'
      })
      .state('cms.my-settings', {
        url: '/my-settings',
        templateUrl: require('./settings/settings.jade'),
        controller: 'SettingsCtrl',
        authenticate: true,
        icon: 'verified_user'
      });
  });
