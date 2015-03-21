'use strict';

var express = require('express');
var controller = require('./menus.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', auth.hasPermission('editContent'), controller.create);
router.put('/', auth.hasPermission('editContent'), controller.update);
router.patch('/', auth.hasPermission('editContent'), controller.update);
router.delete('/', auth.hasPermission('deleteContent'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('editContent'), controller.updateById);
router.patch('/:id', auth.hasPermission('editContent'), controller.updateById);
router.delete('/:id', auth.hasPermission('deleteContent'), controller.deleteById);

module.exports = router;