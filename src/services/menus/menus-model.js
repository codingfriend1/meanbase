'use strict';

// menus-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const menusSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
    // validate: validators.matches(patterns.isTitle)
  },
  url: {
  	type: String,
  	trim: true,
    required: true,
    validate: validators.matches(patterns.isURI)
  },
  linkTo: {
  	type: String,
  	trim: true,
    required: false
  },
  group: {
  	type: String,
  	trim: true,
    required: true,
  	default: 'main',
    validate: validators.matches(patterns.isTitle)
  },
  position: {
  	type: Number,
  	default: 0,
  },
  isDropdown: {
  	type: Boolean,
  	default: false
  },
  classes: {
  	type: String,
  	default: '',
    validate: validators.matches(patterns.isCSSClass, {skipEmpty: true})
  },
  iconClasses: {
  	type: String,
  	default: '',
    validate: validators.matches(patterns.isCSSClass, {skipEmpty: true})
  },
  target: {
  	type: String,
  	default: '',
    validate: validators.matches(patterns.isAnchorTarget, {skipEmpty: true})
  },
  published: {
    type: Boolean,
    default: false
  }
});

const menusModel = mongoose.model('menus', menusSchema);

module.exports = menusModel;
