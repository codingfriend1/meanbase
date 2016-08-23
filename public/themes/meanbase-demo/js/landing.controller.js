angular.module('meanbaseApp').controller('landingController', function ($rootScope, $scope, api) {
  $rootScope.listOptions = [
    {label: 'Selling Point', html: '<selling-point-list></selling-point-list>'},
    {label: 'Bullet Point', html: '<bullet-point-list></bullet-point-list>'}
  ];
});
