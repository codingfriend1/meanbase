'use strict';

// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const userSchema = new Schema({
  facebookId: { type: String },
  facebook: { type: Schema.Types.Mixed },
  githubId: { type: String },
  github: { type: Schema.Types.Mixed },
  googleId: { type: String },
  google: { type: Schema.Types.Mixed },
  instagramId: { type: String },
  instagram: { type: Schema.Types.Mixed },
  linkedinId: { type: String },
  linkedin: { type: Schema.Types.Mixed },
  paypalId: { type: String },
  paypal: { type: Schema.Types.Mixed },

  name: {type: String, required: false, unique: false},
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },

  isVerified: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
    default: false
  },
  verifyExpires: {
    type: Number,
    default: false
  },
  resetToken: {
    type: String,
    default: false
  },
  resetExpires: {
    type: Number,
    default: false
  },

  role: {
    type: String,
    default: 'basic',
    validate: validators.matches(patterns.isTitle)
  },
  enabled: {
    type: Boolean,
    default: true
  },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
