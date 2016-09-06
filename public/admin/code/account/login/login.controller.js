angular.module('meanbaseApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $rootScope, $timeout, $state) {

    $scope.user = {};
    $scope.errors = {};
    $scope.showLogin = true
    $scope.showResetPassword = false

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
            toastr.success('Please check your email to verify your account.')
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

    if($state.params.action && $state.params.token) {
      switch ($state.params.action) {
        case 'verify':
          Auth.verifySignUp($state.params.token).then(function(response) {
            if(response && response.email) {
              $scope.user.email = response.email
            }
          }, function(err) {
            console.log('promise rejected', err);
          });;
          break;
        case 'reset':
          $scope.showResetPassword = true
          $scope.showLogin = false
          break;
      }
    }


    $scope.resetPassword = function(email) {
      Auth.sendResetPassword(email);
    }

    $scope.saveResetPassword = function(password) {
      Auth.saveResetPassword($state.params.token, password)
        .then(function(response) {
          $scope.showLogin = true
          $scope.showResetPassword = false
          $location.path('/cms/account');
        }, function(err) {
          console.log('promise rejected', err);
        });

    }

    $scope.resendVerificationEmail = function(email) {
      console.log("email", email);
      Auth.resendVerify(email);
    }

    $scope.$on('$destroy', function() {
      $scope.$parent.tabs = null;
      componentHandler.upgradeAllRegistered()
    });
  });
