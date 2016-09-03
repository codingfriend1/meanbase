'use strict';

// custom-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customSchema = new Schema({
  belongsTo: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  enabled: {
		type: Boolean,
		default: false
	},
  value: Schema.Types.Mixed,
  permission: {
    type: String
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

customSchema.index({belongsTo: 1, key: 1}, {unique: true});

const customModel = mongoose.model('custom', customSchema);

module.exports = customModel;
