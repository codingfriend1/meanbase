'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var MediaSchema = new Schema({
  url: {
		type: String,
		required: true,
    validate: validators.isFilePath()
	},
	alt: {
		type: String,
		trim: true,
		default: '',
    validate: validators.isTitle({skipEmpty: true})
	},
	attribute: {
		type: String,
		trim: true,
		default: '',
    validate: validators.isTitle({skipEmpty: true})
	},
	groups: [{
		type: String,
		trim: true,
		validate: validators.isTitle({skipEmpty: true})
	}],
	galleries: [{
		type: String,
		trim: true,
		validate: validators.isTitle({skipEmpty: true})
	}]
});

module.exports = mongoose.model('Media', MediaSchema);