'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'manageUsers';

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    // globalHooks.hasPermission(permissionName),
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
    auth.hashPassword()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrictChanges(permissionName, {restrictOn: ['role', 'enabled'] }),
    // auth.hashPassword()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermissionOrRestrictChanges(permissionName, {restrictOn: ['role', 'enabled'] }),
    // auth.hashPassword()
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
  ],
  get: [
    globalHooks.attachPermissions()
  ],
  create: [
    globalHooks.attachPermissions()
  ],
  update: [],
  patch: [],
  remove: []
};
