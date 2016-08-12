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
import hasPermissionOrRestrict from './has-permission-or-restrict';
import hasPermission from './has-permission';
import isEnabled from './is-enabled';
import recaptcha from './recaptcha';
import isTargetEnabled from './is-target-enabled';
import removeFromDisk from './remove-from-disk';

exports.verifyOrRestrict = verifyOrRestrict;
exports.populateOrRestrict = populateOrRestrict;
exports.attachPermissions = attachPermissions;
exports.hasPermissionOrRestrict = hasPermissionOrRestrict;
exports.hasPermission = hasPermission;
exports.isEnabled = isEnabled;
exports.recaptcha = recaptcha;
exports.isTargetEnabled = isTargetEnabled;
exports.removeFromDisk = removeFromDisk;
