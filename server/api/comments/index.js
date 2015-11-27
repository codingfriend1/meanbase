'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var router = express.Router();

var controller = require('./comments.controller');

router.get('/ban', auth.hasPermission('moderateComments'), controller.isBanned);
router.post('/ban', auth.hasPermission('moderateComments'), controller.ban);
router.delete('/ban', auth.hasPermission('moderateComments'), controller.unban);

// Affecting multiple or all items.
router.get('/approved', controller.findApproved);
router.get('/search', controller.search);

router.get('/', auth.hasPermission('moderateComments'), controller.find);
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
