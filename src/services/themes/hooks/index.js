'use strict';

import compileIndex from '../../../components/compile-index';
const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

const permissionName = 'changeSiteSettings';

const recompileIndex = function(hook) {
  if (!hook.params.provider) { return hook; }
  let theme = hook.result;
  if(Array.isArray(hook.result)) {
    theme = hook.result[0];
  }

  compileIndex.call(hook.app, theme);
}

exports.before = {
  all: [],
  find: [

  ],
  get: [

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
    globalHooks.hasPermission(permissionName),
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
    globalHooks.hasPermission(permissionName),
    globalHooks.removeFromDisk({
      service: 'themes',
      containerProperty: 'themesPath',
      folderNameProperty: 'url'
    })
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [
    recompileIndex
  ],
  patch: [
    recompileIndex
  ],
  remove: [
    function(hook) {
      if (!hook.params.provider) { return hook;  }
      compileIndex.call(hook.app);
    },
    globalHooks.deleteCustomData('theme')
  ]
};
