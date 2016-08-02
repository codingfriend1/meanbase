'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.comments', {
        url: '/comments',
        template: require('./comments.jade'),
        controller: 'CommentsCtrl',
        hasPermission: 'moderateComments',
        icon: 'fa-comments'
      });
  });
