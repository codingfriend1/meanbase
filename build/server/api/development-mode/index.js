'use strict';

var express = require('express');
var controller = require('./development-mode.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

// Affecting multiple or all items.
router.get('/', controller.find);
router.post('/', auth.hasPermission('changeSiteSettings'), controller.upsert);

module.exports = router;