const globalHooks = require('../../../hooks')
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication').hooks

import notifySubscribers from './notify-subscribers'
import convertForIncoming from './convert-for-incoming'
import convertForOutgoing from './convert-for-outgoing'
import { deleteMenu, createMenu, updateMenu } from './mirror-menus'

const permissionName = 'editContent'
const restriction = {published: true}

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
    globalHooks.hasPermissionOrRestrict(permissionName, restriction),
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName),
    convertForIncoming()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName),
    notifySubscribers(),
    convertForIncoming()
  ],
  patch: [
    globalHooks.allowUpsert(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName),
    notifySubscribers(),
    convertForIncoming()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    globalHooks.attachPermissions(),
    globalHooks.isEnabled(),
    globalHooks.hasPermission(permissionName)
  ]
}

exports.after = {
  all: [
  ],
  find: [
    convertForOutgoing()
  ],
  get: [
    convertForOutgoing()
  ],
  create: [
    createMenu(),
  ],
  update: [
    updateMenu(),

  ],
  patch: [
    updateMenu(),
  ],
  remove: [
    deleteMenu()
  ]
}
