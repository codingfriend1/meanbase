'use strict';

angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.comments', {
        url: '/comments',
        templateUrl: 'app/comments/comments.html',
        controller: 'CommentsCtrl',
        hasPermission: 'moderateComments',
        icon: 'fa-comments'
      });
  });
