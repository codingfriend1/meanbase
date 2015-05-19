'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var ExtensionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: validators.matches("^([1-zA-Z0-1@.-_ \s]{0,255})$")
  },
  urls: [],
  config: Schema.Types.Mixed,
  data: Schema.Types.Mixed,
  active: {
  	type: Boolean,
  	default: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Extension', ExtensionSchema);