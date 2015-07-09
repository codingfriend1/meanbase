'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var MenusSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    validate: validators.isTitle()
  },
  url: {
  	type: String,
  	trim: true,
    required: true,
    validate: validators.isURI()
  },
  group: {
  	type: String,
  	trim: true,
    required: true,
  	default: 'main',
    validate: validators.isTitle()
  },
  position: {
  	type: Number,
  	default: 0,
  },
  classes: {
  	type: String,
  	default: '',
    validate: validators.isCSSClass({skipEmpty: true})
  },
  target: {
  	type: String,
  	default: '',
    validate: validators.isAnchorTarget({skipEmpty: true})
  },
  published: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Menus', MenusSchema);