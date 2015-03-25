'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.extensions', {
        url: '/extensions',
        templateUrl: 'app/extensions/extensions.html',
        controller: 'ExtensionsCtrl',
        hasPermission: 'manageExtensions'
      });
  });