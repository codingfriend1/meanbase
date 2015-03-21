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
		trim: true
	}
});

module.exports = mongoose.model('Media', MediaSchema);