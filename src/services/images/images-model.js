'use strict';

// images-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const imagesSchema = new Schema({
  url: {
		type: String,
		required: true,
    validate: validators.matches(patterns.isFilePath)
	},
  filename: {
    type: String,
		required: true,
    validate: validators.matches(patterns.isFilePath)
  },
	alt: {
		type: String,
		trim: true,
		default: '',
    validate: validators.matches(patterns.isTitle,{skipEmpty:true})
	},
	attribute: {
		type: String,
		trim: true,
		default: '',
    validate: validators.matches(patterns.isTitle,{skipEmpty:true})
	},
	groups: [{
		type: String,
		trim: true,
		validate: validators.matches(patterns.isTitle,{skipEmpty:true})
	}],
	galleries: [{
		type: String,
		trim: true,
		validate: validators.matches(patterns.isTitle,{skipEmpty:true})
	}],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const imagesModel = mongoose.model('images', imagesSchema);

module.exports = imagesModel;
