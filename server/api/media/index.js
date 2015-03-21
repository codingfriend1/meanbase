'use strict';

var express = require('express');
var controller = require('./media.controller');

var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', auth.hasPermission('manageMedia'), controller.create);
router.put('/', auth.hasPermission('manageMedia'), controller.update);
router.patch('/', auth.hasPermission('manageMedia'), controller.update);
router.delete('/', auth.hasPermission('manageMedia'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('manageMedia'), controller.updateById);
router.patch('/:id', auth.hasPermission('manageMedia'), controller.updateById);
router.delete('/:id', auth.hasPermission('manageMedia'), controller.deleteById);

module.exports = router;