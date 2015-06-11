'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var ExtensionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: validators.isTitle()
  },
  folderName: {
    type: String,
    required: true,
    validate: validators.isFilePath()
  },
  urls: [{
    type: String,
    required: false,
    validate: validators.isURI({skipEmpty: true})
  }],
  screenshot: {
    type: String,
    required: false,
    validate: validators.isFilePath({skipEmpty: true})
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
    validate: validators.isHTML()
  }
});

module.exports = mongoose.model('Extension', ExtensionSchema);