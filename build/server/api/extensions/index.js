'use strict';

var express = require('express');
var controller = require('./extensions.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', auth.hasPermission('editContent'), controller.find);
router.post('/', auth.hasPermission('manageExtensions'), controller.create);
router.post('/upload', controller.upload);
router.put('/', auth.hasPermission('manageExtensions'), controller.update);
router.patch('/', auth.hasPermission('manageExtensions'), controller.update);
router.delete('/', auth.hasPermission('manageExtensions'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('manageExtensions'), controller.updateById);
router.patch('/:id', auth.hasPermission('manageExtensions'), controller.updateById);
router.delete('/:id', auth.hasPermission('manageExtensions'), controller.deleteById);

module.exports = router;