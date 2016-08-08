'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.analytics', {
        url: '/analytics',
        templateUrl: require('./analytics.jade'),
        controller: 'AnalyticsCtrl',
        hasPermission: "viewAnalytics",
        icon: 'show_chart'
      });
  });
