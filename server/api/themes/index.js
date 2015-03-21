'use strict';

var express = require('express');
var controller = require('./themes.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', controller.create);
router.put('/', auth.hasPermission('changeSiteSettings'), controller.update);
router.patch('/', auth.hasPermission('changeSiteSettings'), controller.update);
router.delete('/', auth.hasPermission('changeSiteSettings'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('changeSiteSettings'), controller.updateById);
router.patch('/:id', auth.hasPermission('changeSiteSettings'), controller.updateById);
router.delete('/:id', auth.hasPermission('changeSiteSettings'), controller.deleteById);

module.exports = router;