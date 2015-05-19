'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var ThemesSchema = new Schema({
  author: {
    type: String,
    trim: true,
    validate: validators.matches({skipEmpty: true}, "^([1-zA-Z0-1@.-_ \s]{0,255})$")
  },
  email: {
    type:String,
    lowercase: true,
    validate: validators.isEmail({skipEmpty: true}),
    trim: true
  },
  website: {
    type: String,
    trim: true,
    validate: validators.isURL({skipEmpty: true})
  },
  title: {
    type: String,
    trim: true,
    validate: validators.matches({skipEmpty: true}, "^([1-zA-Z0-1@.-_ \s]{0,255})$"),
    required: true
  },
  description: {
    type: String,
    trim: true,
    validate: validators.matches({skipEmpty: true}, "^([1-zA-Z0-1@.-_ \s]{1,255})$")
  },
  url: {
  	type: String,
  	unique: true,
    required: true,
    trim: true,
    validate: validators.isURL({allow_protocol_relative_urls: true, require_tld: false, allow_underscores: true})
  },
  preview: String,
  active: {
  	type: Boolean,
  	required: true,
  	default: false
  },
  templates: {
  	type: Object,
  	required: true,
  	default: {
			"home": ["home"],
			"archive": ["archive"],
			"page": ["page"],
			"article": ["article"],
			"404": ["404"]
  	}
  },
  meta: Object
});

module.exports = mongoose.model('Themes', ThemesSchema);