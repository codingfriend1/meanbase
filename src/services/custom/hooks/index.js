'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'editContent';
const restriction = {};

exports.before = {
  all: [],
  find: [
    globalHooks.verifyOrRestrict(restriction),
    globalHooks.populateOrRestrict(restriction),
    globalHooks.isEnabled(),
    globalHooks.attachPermissions()
  ],
  get: [
    globalHooks.verifyOrRestrict(restriction),
    globalHooks.populateOrRestrict(restriction),
    globalHooks.isEnabled(),
    globalHooks.attachPermissions()
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.attachPermissions(),
    globalHooks.updateByPermission()
  ],
  update: [
    auth.verifyToken(restriction),
    auth.populateUser(restriction),
    auth.restrictToAuthenticated(),
    globalHooks.isEnabled(),
    globalHooks.attachPermissions(),
    globalHooks.updateByPermission()
  ],
  patch: [
    globalHooks.allowUpsert(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.updateByPermission()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.updateByPermission()
  ]
};

exports.after = {
  all: [],
  find: [
    globalHooks.filterByPermissionOrRestrict()
  ],
  get: [
    globalHooks.filterByPermissionOrRestrict()
  ],
  create: [],
  update: [],
  patch: [],
  remove: []
};
