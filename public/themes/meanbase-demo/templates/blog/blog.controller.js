angular.module('meanbaseApp').controller('blogController', function ($rootScope, $scope, api) {
  if(!$rootScope.page.lists.socialFooter1) {
    $rootScope.page.lists.socialFooter1 = {
      items: []
    }
  }

});
