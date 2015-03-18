'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThemesSchema = new Schema({
  author: String,
  email: String,
  website: String,
  title: String,
  description: String,
  url: {
  	type: String,
  	unique: true
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