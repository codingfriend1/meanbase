'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var ThemesSchema = new Schema({
  author: {
    type: String,
    trim: true,
    validate: validators.isTitle({skipEmpty: true})
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
    lowercase: true,
    validate: validators.isURL({skipEmpty: true})
  },
  title: {
    type: String,
    trim: true,
    validate: validators.isTitle({skipEmpty: true}),
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: false,
    validate: validators.isText({skipEmpty: true})
  },
  url: {
  	type: String,
  	unique: true,
    required: true,
    trim: true,
    validate: validators.isFilePath()
  },
  preview: {
    type: String,
    required: false,
    validate: validators.isFilePath({skipEmpty: true})
  },
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
  templatePaths: {
    type: Object,
    required: true,
  },
  scriptsPath: {
    type: String,
    trim: true,
    validate: validators.isFilePath({skipEmpty: true})
  },
  stylesPath: {
    type: String,
    trim: true,
    validate: validators.isFilePath({skipEmpty: true})
  },
  themeJSONPath: {
    type: String,
    trim: true,
    required: true,
    validate: validators.isFilePath()
  },
  meta: Object
});

module.exports = mongoose.model('Themes', ThemesSchema);