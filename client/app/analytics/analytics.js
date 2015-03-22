'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.analytics', {
        url: '/analytics',
        templateUrl: 'app/analytics/analytics.html',
        controller: 'AnalyticsCtrl',
        authenticate: true
      });
  });