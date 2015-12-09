'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    patterns = require('../../components/patterns'),
    validators = require('mongoose-validators');

var ExtensionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: validators.matches(patterns.isTitle)
  },
  folderName: {
    type: String,
    required: true,
    validate: validators.matches(patterns.isFilePath)
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
  }
});

module.exports = mongoose.model('Extension', ExtensionSchema);
