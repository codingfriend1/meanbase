angular.module('meanbaseApp').controller('homeController', function ($rootScope, $scope, api) {

  if(!$rootScope.listOptions) { $rootScope.listOptions = []; }
  $rootScope.listOptions.concat([
    {label: 'Selling Point', html: '<selling-point-list></selling-point-list>'},
    {label: 'Bullet Point', html: '<bullet-point-list></bullet-point-list>'}
  ]);
});
