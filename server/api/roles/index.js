'use strict';

var express = require('express');
var controller = require('./roles.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', controller.create);
router.put('/', controller.update);
router.patch('/', controller.update);
router.delete('/', controller.delete);

// Affecting single items.
router.get('/:id', controller.findById);
router.put('/:id', controller.updateById);
router.patch('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;