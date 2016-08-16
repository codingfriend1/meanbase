'use strict';

const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');

const socket = io('http://localhost:3030');
window.app = feathers()
  .configure(hooks())
  .configure(socketio(socket));

angular.module('meanbaseApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'angularFileUpload',
  'ngTouch',
  'extensions',
  'ng-sortable',
  'toastr',
  'relativeDate',
  'ngAnalytics',
  'vcRecaptcha'
])
  .config(function ($stateProvider, $urlRouterProvider, $compileProvider, $locationProvider, $httpProvider, $urlMatcherFactoryProvider, $provide) {
    $urlRouterProvider
      .otherwise('/');
    $urlMatcherFactoryProvider.strictMode(false);

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $provide.decorator('$rootScope', ['$delegate', function($delegate){
      $delegate.constructor.prototype.$onRootScope = function(name, listener){
        var unsubscribe = $delegate.$on(name, listener);
        this.$on('$destroy', unsubscribe);
      };
      return $delegate;
    }]);
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      // responseError: function(response) {
      //   if(response.status === 401) {
      //     $location.path('/login');
      //     // remove any stale tokens
      //     $cookieStore.remove('token');
      //     return $q.reject(response);
      //   }
      //   else {
      //     return $q.reject(response);
      //   }
      // }
    };
  })

  .run(function ($rootScope, $location, Auth, ngAnalyticsService, api) {

    api.settings.find({name: 'clientID'}).then(function(res) {
      if(!res[0] || ! res[0].value) { return false; }
      ngAnalyticsService.setClientId(res[0].value);
    });

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });

      if(!next.hasPermission) return false;

      Auth.hasPermission(next.hasPermission, function(hasPermission) {
        if(!hasPermission) { $location.path('/login'); }
      });
    });
  });
