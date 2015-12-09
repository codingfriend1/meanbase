'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    patterns = require('../../components/patterns'),
    validators = require('mongoose-validators');

var SharedContentSchema = new Schema({
  contentName: {
  	type: String,
  	unique: true,
  	required: true,
    validate: validators.matches(patterns.isTitle)
  },
  data: Schema.Types.Mixed,
  config: Schema.Types.Mixed,
  type: {
  	type: String,
  	required: true,
  	validate: validators.matches(patterns.isTitle)
  }
});

module.exports = mongoose.model('SharedContent', SharedContentSchema);
