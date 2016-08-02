'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.analytics', {
        url: '/analytics',
        template: require('./analytics.jade'),
        controller: 'AnalyticsCtrl',
        hasPermission: "viewAnalytics",
        icon: 'fa-bar-chart'
      });
  });
