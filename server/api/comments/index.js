'use strict';

var express = require('express');
var controller = require('./comments.controller');

var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/', auth.hasPermission('moderateComments'), controller.update);
router.patch('/', auth.hasPermission('moderateComments'), controller.update);
router.delete('/', auth.hasPermission('moderateComments'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('moderateComments'), controller.updateById);
router.patch('/:id', auth.hasPermission('moderateComments'), controller.updateById);
router.delete('/:id', auth.hasPermission('moderateComments'), controller.deleteById);

module.exports = router;