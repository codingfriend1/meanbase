'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.pages', {
        url: '/pages',
        templateUrl: require('./pages.jade'),
        controller: 'CommentsCtrl',
        hasPermission: 'editContent',
        icon: 'fa-pages'
      });
  });
