angular.module('meanbaseApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $rootScope, $timeout) {
    $scope.user = {};
    $scope.errors = {};

    $scope.$parent.pageTitle = "Account";

    $scope.$parent.tabs = [
      {title: "Login", id: '#Login', active: true},
      {title: "Sign Up", id: '#Sign-Up', active: false}
    ];

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(res) {
          // Logged in, redirect to home
          $timeout(function() {
            $rootScope.isLoggedIn = Auth.isLoggedIn();
            location.href = '/cms/pages';
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.logout = function() {
      Auth.logout();
      location.href = '/';
    }

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $timeout(function() {
            $rootScope.isLoggedIn = Auth.isLoggedIn();
            location.href = '/cms';
          });
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.$on('$destroy', function() {
      $scope.$parent.tabs = null;
      componentHandler.upgradeAllRegistered()
    });
  });
