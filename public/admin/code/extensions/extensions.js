'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.extensions', {
        url: '/extensions',
        templateUrl: require('./extensions.jade'),
        controller: 'ExtensionsCtrl',
        hasPermission: 'manageExtensions',
        icon: 'input'
      });
  });
