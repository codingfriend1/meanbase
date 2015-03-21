'use strict';

var express = require('express');
var controller = require('./roles.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', auth.hasPermission('manageRoles'), controller.create);
router.put('/', auth.hasPermission('manageRoles'), controller.update);
router.patch('/', auth.hasPermission('manageRoles'), controller.update);
router.delete('/', auth.hasPermission('manageRoles'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('manageRoles'), controller.updateById);
router.patch('/:id', auth.hasPermission('manageRoles'), controller.updateById);
router.delete('/:id', auth.hasPermission('manageRoles'), controller.deleteById);

module.exports = router;