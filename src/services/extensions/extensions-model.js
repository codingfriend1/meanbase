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
  label: {
    type: String,
    required: true,
    trim: true
  },
  html: {
    type: String,
    required: true,
    validate: validators.matches(patterns.isFilePath)
  },
  folder: {
    type: String,
    required: true,
    validate: validators.matches(patterns.isFilePath)
  },
  contents: {
    type: String,
    required: true,
    validate: validators.matches(patterns.isFilePath)
  },
  screenshot: {
    type: String,
    required: false,
    validate: validators.matches(patterns.isFilePath, {skipEmpty: true})
  },
  active: {
  	type: Boolean,
  	default: true
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const extensionsModel = mongoose.model('extensions', extensionsSchema);

module.exports = extensionsModel;
