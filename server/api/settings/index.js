'use strict';

var express = require('express');
var controller = require('./settings.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.find);
router.post('/', auth.hasPermission('changeSiteSettings'), controller.create);
router.put('/', auth.hasPermission('changeSiteSettings'), controller.update);
router.delete('/', auth.hasPermission('changeSiteSettings'), controller.delete);

module.exports = router;