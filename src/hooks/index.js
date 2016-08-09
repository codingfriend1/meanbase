'use strict';
import errors from 'feathers-errors';

// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

import populateOrRestrict from './populate-or-restrict.js';
import verifyOrRestrict from './verify-or-restrict.js';

exports.populateOrRestrict = populateOrRestrict;
exports.verifyOrRestrict = verifyOrRestrict;

exports.recaptcha = function(options) {
  return async function(hook) {
    try {
      Promise.resolve(hook);
    } catch(err) {
      Promise.reject(err);
    }
  }
};

exports.attachPermissions = function(options) {
  return async function(hook) {
    try {

      if (!hook.params.provider) { return Promise.resolve(hook); }

      let role;
      if (hook.type !== 'before' && hook.params.user) {
        role = hook.params.user.role;
      } else if (hook.type !== 'after' && hook.result) {
        role = hook.result.role;
      }

      if(role) {
        let access = await hook.app.service('roles').find({query: { role } });

        access = access[0];

        hook.params.user.permissions = access.permissions;

        if(hook.type === 'after' && hook.result && !Array.isArray(hook.result)) {
          hook.result.permissions = access.permissions;
        }
      }

      return Promise.resolve(hook);
    } catch(err) {
      return Promise.reject(err);
    }
  }
};

exports.isEnabled = function(options) {
  return function(hook) {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user) {
      throw new Error('Cannot check enabled of a non-existant user.');
    } else if(!hook.params.user.enabled) {
      throw new Error('Your account must be enabled to do that.');
    }
  }
};

exports.isEnabled = function(options) {
  return function(hook) {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user) {
      throw new Error('Cannot check enabled of a non-existant user.');
    } else if(!hook.params.user.enabled) {
      throw new Error('Your account must be enabled to do that.');
    }
  }
};

exports.hasPermission = function(permissionName) {
  return function(hook) {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user) {
      throw new Error('Cannot check permissions of a non-existant user.');
    } else if (hook.params.user.permissions[permissionName] !== true && hook.params.user.permissions['allPrivilages'] !== true) {
      throw new Error('You must be a(n) ' + permissionName + ' to do that.');
    }
  };
};

exports.hasPermissionOrRestrict = function(permissionName, restriction) {
  return async function(hook) {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user || (hook.params.user.permissions[permissionName] !== true && hook.params.user.permissions['allPrivilages'] !== true)) {

      let query = Object.assign({}, hook.params.query, restriction);
      const params = Object.assign({}, hook.params, { provider: undefined });
      if(hook.id !== null && hook.id !== undefined) {
        const id = {};
        id._id = hook.id;
        query = Object.assign(query, id);
      }
      try {
        let results = await this.find({ query }, params);

        if(hook.method === 'get' && Array.isArray(results) && results.length === 1) {
          hook.result = results[0];
          return hook;
        } else {
          hook.result = results;
          Promise.resolve(hook);
        }
      } catch (e) {
        Promise.reject(new errors.NotFound(`No record found`));
      }

    }
  };
};
