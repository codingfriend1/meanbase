'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var router = express.Router();

var controller = require('./import.controller');

router.get('/', auth.hasPermission('importExportData'), controller.find);
router.post('/', auth.hasPermission('importExportData'), controller.upload);
router.put('/', auth.hasPermission('importExportData'), controller.update);
router.patch('/', auth.hasPermission('importExportData'), controller.update);
router.delete('/', auth.hasPermission('importExportData'), controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', auth.hasPermission('importExportData'), controller.updateById);
router.patch('/:id', auth.hasPermission('importExportData'), controller.updateById);
router.delete('/:id', auth.hasPermission('importExportData'), controller.deleteById);

module.exports = router;