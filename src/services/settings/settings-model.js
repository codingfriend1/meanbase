'use strict';

// settings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const settingsSchema = new Schema({
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

const settingsModel = mongoose.model('settings', settingsSchema);

module.exports = settingsModel;
