'use strict';
import arrayToObject from './array-to-object';
import objectToArray from './object-to-array';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'editContent';
const restriction = {published: true};

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
    globalHooks.hasPermission(permissionName),
    objectToArray()
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
  all: [
    arrayToObject()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
