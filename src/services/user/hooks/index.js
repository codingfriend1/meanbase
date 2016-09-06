'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const verifyHooks = require('feathers-service-verify-reset').hooks
const permissionName = 'manageUsers';

function ifFirstUserThenAdmin(hook) {
  return new Promise((resolve, reject) => {
    hook.app.service('/users').find({query: {}}).then(function(found) {
      if(found && Number.isInteger(found.total) && Array.isArray(found.data)) {
        found = found.data
      }

      if(found.length === 0) {
        hook.data.role = 'admin'
        console.log('set role to admin');
      }

      resolve(hook)
    }, function(err) {
      reject(err)
    });
  })
}

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    function(hook) {
      console.log('calling find', hook.params);
      console.log("hook.result", hook.result);
    },
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled()
    // auth.restrictToOwner({ ownerField: '_id' }),
  ],
  create: [
    auth.hashPassword(),
    ifFirstUserThenAdmin,
    verifyHooks.addVerification()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrictChanges(permissionName, {restrictOn: ['role', 'enabled'] }),
    globalHooks.permitChangePassword(),
    globalHooks.ifPasswordThenHash()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrictChanges(permissionName, {restrictOn: ['role', 'enabled'] }),
    globalHooks.permitChangePassword(),
    globalHooks.ifPasswordThenHash()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ]
};

exports.after = {
  all: [
    hooks.remove('password')
  ],
  find: [
    verifyHooks.removeVerification(true),
    function(hook) {
      if (!hook.params.provider) {
        hook.result = hook.result.data
      }
      return hook
    },
  ],
  get: [
    globalHooks.attachPermissions(),
    verifyHooks.removeVerification(true)
  ],
  create: [
    globalHooks.attachPermissions(),
    globalHooks.sendVerificationEmail(),
    verifyHooks.removeVerification(true)
  ],
  update: [
    verifyHooks.removeVerification(true)
  ],
  patch: [
    verifyHooks.removeVerification()
  ],
  remove: [
    verifyHooks.removeVerification()
  ]
};
