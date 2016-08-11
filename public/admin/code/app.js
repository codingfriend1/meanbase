angular.module('meanbaseApp', [
  'ngCookies',
  'ngResource',
  'mdl',
  'ngSanitize',
  'ui.router',
  'angularFileUpload',
  'ngTouch',
  'extensions',
  'toastr',
  'relativeDate',
  'ngAnalytics'
])
  .config(function ($stateProvider, $urlRouterProvider, $compileProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $provide) {
    $urlRouterProvider
      .otherwise('/');
    $urlMatcherFactoryProvider.strictMode(false);

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

    $provide.decorator('$rootScope', ['$delegate', function($delegate){
      $delegate.constructor.prototype.$onRootScope = function(name, listener){
        var unsubscribe = $delegate.$on(name, listener);
        this.$on('$destroy', unsubscribe);
      };
      return $delegate;
    }]);
  })

  .run(function ($rootScope, $location, Auth, ngAnalyticsService, api, $timeout, $state) {

    $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
        componentHandler.upgradeAllRegistered()
      });
    });

    api.settings.find({name: 'clientID'}).then(function(res) {
      if(!res[0] || ! res[0].value) { return false; }
      ngAnalyticsService.setClientId(res[0].value);
    })


    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if(!Auth.isLoggedIn() && toState.name !== 'cms.account') {
        event.preventDefault();

        function continueNavigation() {
          var params = angular.copy(toParams);
          params.skipSomeAsync = true;
          $state.go(toState.name, params);
        }

        Auth.isLoggedInAsync(function(loggedIn) {
          if (toState.authenticate && !loggedIn) {
            $location.path('/cms/account');
          } else {
            $rootScope.isLoggedIn = loggedIn;
            $rootScope.currentUser = Auth.getCurrentUser();

            if(toState.hasPermission) {
              Auth.hasPermission(toState.hasPermission, function(hasPermission) {
                if(!hasPermission) {
                  $location.path('/cms/account');
                } else {
                  continueNavigation();
                }
              });
            } else {
              continueNavigation();
            }
          }
        });

      }

    });
  });
