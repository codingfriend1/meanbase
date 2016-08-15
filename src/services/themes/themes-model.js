'use strict';

// themes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const themesSchema = new Schema({
  author: {
    type: String,
    trim: true,
    validate: validators.matches(patterns.isTitle, {skipEmpty:true})
  },
  email: {
    type:String,
    lowercase: true,
    validate: validators.isEmail({skipEmpty:true}),
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
    validate: validators.matches(patterns.isTitle, {skipEmpty:true}),
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: false,
    validate: validators.matches(patterns.isText, {skipEmpty: true})
  },
  url: {
  	type: String,
  	unique: true,
    required: true,
    trim: true,
    validate: validators.matches(patterns.isFilePath)
  },
  preview: {
    type: String,
    required: false
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
  themeJSONPath: {
    type: String,
    trim: true,
    required: true,
    validate: validators.matches(patterns.isFilePath)
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const themesModel = mongoose.model('themes', themesSchema);

module.exports = themesModel;
