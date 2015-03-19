'use strict';

var express = require('express');
var controller = require('./pages.controller');
var router = express.Router();

router.get('/', controller.find);
router.post('/', controller.create);
router.put('/', controller.update);
router.patch('/', controller.update);
router.delete('/', controller.delete);

router.get('/:id', controller.findById);
router.put('/:id', controller.updateById);
router.patch('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

module.exports = router;