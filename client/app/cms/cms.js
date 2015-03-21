'use strict';

// ### Parent route for backend. 
// - All routes for the admin interface have cms/ as their prefix
angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms', {
        url: '/cms',
        templateUrl: 'app/cms/cms.html',
        controller: 'cmsCtrl'
      });
  });