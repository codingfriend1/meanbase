'use strict';

// comments-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const commentsSchema = new Schema({
  author: {
    type: String,
    trim: true,
    default: 'anonymous'
  },
  content: {
		type: String,
    trim: true,
		required: true,
    validate: validators.matches(patterns.isText)
  },
  url: {
    type: String,
    validate: validators.matches(patterns.isURI, {skipEmpty: true})
  },
  date: {
  	type: Date,
  	default: Date.now
  },
  email: {
  	type: String,
    lowercase: true,
    validate: validators.isEmail({skipEmpty:true})
  },
  ip: {
  	type: String,
    trim: true,
    validate: validators.isIP({skipEmpty: true})
  },
  gravatar: {
  	type: String,
    validate: validators.matches(patterns.isURI, {skipEmpty: true})
  },
  approved: {
  	type: Boolean,
  	default: false,
  	required: true
  },
  likes: Number,
  meta: Object,
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;
