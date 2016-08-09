'use strict';

angular.module('meanbaseApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, feathers) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = feathers.get('user');
    }

    return {
      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        feathers.authenticate({
          type: 'local',
          email: user.email,
          password: user.password
        }).then(function(result){
          feathers.service('/api/users').get(result.data._id).then(function(response) {
            $rootScope.isLoggedIn = true;
            feathers.set('user', response);
            currentUser = feathers.get('user');
            deferred.resolve(result);
          });
          return cb();
        }).catch(function(error){
          console.error('Error authenticating!', error);
          this.logout();
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        feathers.logout();
        currentUser = {};
        $rootScope.isLoggedIn = false;
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {

            currentUser = feathers.get('user');
            $rootScope.isLoggedIn = true;
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        feathers.authenticate().then(function(result) {
          feathers.service('/api/users').get(result.data._id).then(function(response) {
            feathers.set('user', response);
            currentUser = feathers.get('user');
            cb(true);
          });

        }, function(err) {
          cb(false);
        });
      },

      // Check if the user's role has the correct permission
      hasPermission: function(permissionName, cb) {
        currentUser = feathers.get('user');
        if(_.isPlainObject(currentUser)) {
          feathers.authenticate().then(function(response) {
            feathers.set('user', response);
            currentUser = feathers.get('user');
            if(!currentUser.hasOwnProperty('permissions')) { cb(false); return false; }
            // If user's role is in meanbaseGlobals.roles then check roles to see if user has permission
            // Or if user has allPrivilages
            if(currentUser.permissions.indexOf(permissionName) > -1 || currentUser.permissions.indexOf('allPrivilages') > -1) {
              cb(true);
            } else {
              cb(false);
            }
          }, function(err) {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('permissions')) {
          // If user's role is in meanbaseGlobals.roles then check roles to see if user has permission
          // Or if user has allPrivilages
          if(currentUser.permissions.indexOf(permissionName) > -1 || currentUser.permissions.indexOf('allPrivilages') > -1) {
            cb(true);
          } else {
            cb(false);
          }
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        feathers.get('token')
      }
    };
  });
