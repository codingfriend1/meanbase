'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    patterns = require('../../components/patterns'),
    validators = require('mongoose-validators');

var MenusSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    validate: validators.matches(patterns.isTitle)
  },
  url: {
  	type: String,
  	trim: true,
    required: true,
    validate: validators.matches(patterns.isURI)
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
  classes: {
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
    default: true
  }
});

module.exports = mongoose.model('Menus', MenusSchema);
