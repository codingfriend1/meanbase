'use strict';

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
    function(hook) {
      if (!hook.data.uri && hook.params.file){
        const file = hook.params.file;
        const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
        hook.data = {uri: uri};
      }
    }
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
