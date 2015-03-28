'use strict';
(function(){
  angular.module('meanbaseApp').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$rootScope', '$scope', '$http', 'Auth', '$location', 'endpoints'];
  function MainCtrl($rootScope, $scope, $http, Auth, $location, endpoints) {
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

    // Get the current page by watching for changes on meanbaseGlobals.page
    $scope.$watch(function() {
      return window.meanbaseGlobals.page;
    }, function(page) {
      $scope.page = page;
    });

  }
})();
