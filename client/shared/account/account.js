'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: require('./login/login.jade'),
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: require('./signup/signup.jade'),
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: require('./settings/settings.jade'),
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
