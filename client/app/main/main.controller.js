'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$http', 'Auth', '$location', 'endpoints'];
  function MainCtrl($scope, $http, Auth, $location, endpoints) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    var endpoints = {
      menus: new endpoints('menus')
    };

    // Get the current logged in user
    $scope.currentUser = Auth.getCurrentUser();

    // Get all the menus
    endpoints.menus.find({}).then(function(response) {
      $scope.menus = response.data;
    });

  }
})();
