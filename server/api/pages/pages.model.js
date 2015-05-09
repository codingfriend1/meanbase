'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Since extensions is embedded in page we define that schema here
var ExtensionsSchema = new Schema({
  group: String,
  position: Number,
  html: String,
  config: Schema.Types.Mixed,
  data: Schema.Types.Mixed
});

mongoose.model('Extensions', ExtensionsSchema);



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
	images: {
		type: Object,
		default: {}
	},
	extensions: [
		{type: Schema.ObjectId, ref: 'Extensions'}
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