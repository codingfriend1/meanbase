'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var ExtensiondataSchema = new Schema({
  name: {
  	type: String,
  	unique: true,
  	required: true,
    validate: validators.isTitle()
  },
  data: Schema.Types.Mixed,
});

module.exports = mongoose.model('Extensiondata', ExtensiondataSchema);