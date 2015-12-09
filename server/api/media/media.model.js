'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    patterns = require('../../components/patterns'),
    validators = require('mongoose-validators');

var MediaSchema = new Schema({
  url: {
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
	}]
});

module.exports = mongoose.model('Media', MediaSchema);
