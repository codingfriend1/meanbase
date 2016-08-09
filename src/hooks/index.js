'use strict';
import errors from 'feathers-errors';
import _ from 'lodash';

// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

import populateOrRestrict from './populate-or-restrict';
import verifyOrRestrict from './verify-or-restrict';
import attachPermissions from './attach-permissions';

exports.populateOrRestrict = populateOrRestrict;
exports.verifyOrRestrict = verifyOrRestrict;

exports.attachPermissions = attachPermissions;

exports.recaptcha = function(options) {
  return async function(hook) {
    try {
      Promise.resolve(hook);
    } catch(err) {
      Promise.reject(err);
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
    } else if (hook.params.user.permissions.indexOf(permissionName) === -1 && hook.params.user.permissions.indexOf('allPrivilages') === -1) {
      throw new Error('You must be a(n) ' + permissionName + ' to do that.');
    }
  };
};

exports.hasPermissionOrRestrict = function(permissionName, restriction) {
  return async function(hook) {
    if (!hook.params.provider) { return hook; }
    if(!hook.params.user || (hook.params.user.permissions.indexOf(permissionName) === -1 && hook.params.user.permissions.indexOf('allPrivilages') === -1) ) {

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
