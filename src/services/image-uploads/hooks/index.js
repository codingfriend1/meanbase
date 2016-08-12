'use strict';

import resize from './resize';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const dauria = require('dauria');

const permissionName = 'manageMedia';

exports.before = {
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName),
    resize()
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
