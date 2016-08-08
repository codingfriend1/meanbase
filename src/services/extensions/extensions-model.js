'use strict';

// extensions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const extensionsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: validators.matches(patterns.isTitle)
  },
  urls: [{
    type: String,
    required: false,
    validate: validators.matches(patterns.isURI, {skipEmpty: true})
  }],
  screenshot: {
    type: String,
    required: false,
    validate: validators.matches(patterns.isFilePath, {skipEmpty: true})
  },
  config: Schema.Types.Mixed,
  data: Schema.Types.Mixed,
  active: {
  	type: Boolean,
  	default: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    validate: validators.matches(patterns.isHTML)
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const extensionsModel = mongoose.model('extensions', extensionsSchema);

module.exports = extensionsModel;
