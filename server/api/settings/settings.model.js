'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var SettingsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: validators.isTitle()
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);