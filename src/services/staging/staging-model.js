'use strict';

// staging-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stagingSchema = new Schema({
  belongsTo: { type: String, required: false, trim: true, default: '' },
  key: { type: String, required: true, unique: true},
  data: Schema.Types.Mixed,
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

stagingSchema.index({belongsTo: 1, key: 1}, {unique: true});

const stagingModel = mongoose.model('staging', stagingSchema);

module.exports = stagingModel;
