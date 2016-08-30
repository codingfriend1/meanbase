angular.module('meanbaseApp').controller('homeController', function ($rootScope, $scope) {
  if(!$rootScope.listOptions) { $rootScope.listOptions = []; }

  $rootScope.listOptions = $rootScope.listOptions.concat([
    {label: 'Team Members', html: '<team-member-list></team-member-list>'}
  ]);

});
