'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PagesSchema = new Schema({
	url: {
		type: String,
		unique: true,
		trim: true
	},
	template: {
		type: String,
		required: true,
		trim: true
	},
	visibility: {
		type: String,
		default: 'basic',
		trim: true
	},
	editability: {
		type: String,
		trim: true
	},
	created: {
		type: Date, 
		default: Date.now
	},
	updated: Date,
	author: String,
	tabTitle: {
		type: String,
		trim: true
	},
	title: {
		type: String,
		trim: true,
		default: "Title"
	},
	content: {
		type: Object,
		default: {}
	},
	images: [{
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
		location: {
			type: String
		}
	}],
	extensions: [
		{
			name: String,
		  group: String,
		  position: Number,
		  text: String,
		  useShared: {
		  	type: Boolean,
		  	default: false
		  },
		  sharedSource: {
		  	type: String
		  },
		  config: Schema.Types.Mixed,
		  data: Schema.Types.Mixed
		}
	],
	description: String,
	summary: String,
	meta: Object,
	published: {
		type: Boolean,
		default: false
	},
	likes: Number
});

module.exports = mongoose.model('Pages', PagesSchema);