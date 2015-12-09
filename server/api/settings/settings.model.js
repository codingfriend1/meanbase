'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    patterns = require('../../components/patterns'),
    validators = require('mongoose-validators');

var SettingsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: validators.matches(patterns.isTitle)
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
