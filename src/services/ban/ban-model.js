'use strict';

// ban-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const banSchema = new Schema({
  email: {
  	type: String,
    lowercase: true,
    unique: true,
    validate: validators.isEmail({skipEmpty:true})
  },
  ip: {
  	type: String,
    trim: true,
    validate: validators.isIP({skipEmpty: true})
  }
});

const banModel = mongoose.model('ban', banSchema);

module.exports = banModel;
