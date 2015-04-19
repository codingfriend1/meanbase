'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MediaSchema = new Schema({
  url: {
		type: String,
		required: true
	},
	alt: {
		type: String,
		trim: true,
		default: ''
	},
	attribute: {
		type: String,
		trim: true,
		default: ''
	},
	groups: Array
});

module.exports = mongoose.model('Media', MediaSchema);