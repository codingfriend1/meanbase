angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms.comments', {
        url: '/comments',
        templateUrl: require('./comments.jade'),
        controller: 'CommentsCtrl',
        hasPermission: 'moderateComments',
        icon: 'comment'
      });
  });
