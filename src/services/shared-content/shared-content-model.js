'use strict';

// shared-content-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const sharedContentSchema = new Schema({
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

const sharedContentModel = mongoose.model('shared-content', sharedContentSchema);

module.exports = sharedContentModel;
