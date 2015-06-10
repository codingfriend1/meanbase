'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var ExtensionsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: validators.isTitle()
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

module.exports = mongoose.model('Extensions', ExtensionsSchema);