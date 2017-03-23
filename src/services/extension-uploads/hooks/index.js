'use strict';

import examineExtension from './examine-extension';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'changeSiteSettings';

exports.before = {
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName),
    examineExtension()
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [

  ],
  update: [],
  patch: [],
  remove: []
};
