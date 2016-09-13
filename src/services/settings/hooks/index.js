'use strict';

import recompileIndex from './recompile-index';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'changeSiteSettings';

const restriction = {name: 'clientID'};

exports.before = {
  all: [],
  find: [
    globalHooks.verifyOrRestrict(restriction),
    globalHooks.populateOrRestrict(restriction),
    globalHooks.isEnabled(),
    globalHooks.attachPermissions(),
    globalHooks.hasPermissionOrRestrict(permissionName, restriction)
  ],
  get: [
    globalHooks.verifyOrRestrict(restriction),
    globalHooks.populateOrRestrict(restriction),
    globalHooks.isEnabled(),
    globalHooks.attachPermissions(),
    globalHooks.hasPermissionOrRestrict(permissionName, restriction)
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ],
  patch: [
    globalHooks.allowUpsert(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
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
  all: [],
  find: [],
  get: [],
  create: [
    recompileIndex()
  ],
  update: [
    recompileIndex()
  ],
  patch: [
    recompileIndex()
  ],
  remove: []
};
