'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImportSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Import', ImportSchema);