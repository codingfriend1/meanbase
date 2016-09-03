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
import hasPermissionOrRestrictChanges from './permission-or-restrict-changes';
import ownerOrRestrictChanges from './owner-or-restrict-changes';
import ifPasswordThenHash from './if-password-then-hash';
import permitChangePassword from './permit-change-password';
import filterByPermissionOrRestrict from './filter-by-permission-or-restrict'
import updateByPermission from './update-by-permission'
import deleteCustomData from './delete-custom-data'


exports.verifyOrRestrict = verifyOrRestrict;
exports.populateOrRestrict = populateOrRestrict;
exports.attachPermissions = attachPermissions;
exports.hasPermissionOrRestrict = hasPermissionOrRestrict;
exports.hasPermission = hasPermission;
exports.isEnabled = isEnabled;
exports.recaptcha = recaptcha;
exports.isTargetEnabled = isTargetEnabled;
exports.removeFromDisk = removeFromDisk;
exports.hasPermissionOrRestrictChanges = hasPermissionOrRestrictChanges;
exports.ownerOrRestrictChanges = ownerOrRestrictChanges;
exports.ifPasswordThenHash = ifPasswordThenHash;
exports.permitChangePassword = permitChangePassword;
exports.filterByPermissionOrRestrict = filterByPermissionOrRestrict;
exports.updateByPermission = updateByPermission;
exports.deleteCustomData = deleteCustomData;
