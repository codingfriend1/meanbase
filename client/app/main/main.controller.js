'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$http', 'Auth', '$location'];
  function MainCtrl($scope, $http, Auth, $location) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.currentUser = Auth.getCurrentUser();

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
  }
})();
