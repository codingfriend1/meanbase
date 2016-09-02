// ### Parent route for backend.
// - All routes for the admin interface have cms/ as their prefix
angular.module('meanbaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cms', {
        url: '/cms',
        templateUrl: require('./cms.jade'),
        controller: 'cmsCtrl',
        controllerAs: 'cms',
        authenticate: true
      });
  });
