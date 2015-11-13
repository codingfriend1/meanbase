'use strict';

var express = require('express');
var controller = require('./pages.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.post('/publish/:id', auth.hasPermission('publishContent'), controller.publish);
router.get('/published', controller.findPublished);
router.get('/published/search', controller.searchPublished);
router.get('/published/:id', controller.findPublishedById);

// Affecting multiple or all items.
router.get('/', auth.hasPermission('editContent'), controller.find);
router.get('/search', auth.hasPermission('editContent'), controller.search);
router.post('/', auth.hasPermission('editContent'), controller.create);
router.put('/', auth.hasPermission('editContent'), controller.updateOneAndUpdate);
router.patch('/', auth.hasPermission('editContent'), controller.updateOneAndUpdate);
router.delete('/', auth.hasPermission('deleteContent'), controller.deleteOneAndUpdate);

// Affecting single items.
router.get('/:id', auth.hasPermission('editContent'), controller.findById);
router.put('/:id', auth.hasPermission('editContent'), controller.updateById);
router.patch('/:id', auth.hasPermission('editContent'), controller.updateById);
router.delete('/:id', auth.hasPermission('deleteContent'), controller.deleteOneAndUpdate);

module.exports = router;