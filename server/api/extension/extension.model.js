'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExtensionSchema = new Schema({
  name: String,
  urls: [],
  config: Schema.Types.Mixed,
  data: Schema.Types.Mixed,
  active: {
  	type: Boolean,
  	default: true
  },
  html: String
});

module.exports = mongoose.model('Extension', ExtensionSchema);