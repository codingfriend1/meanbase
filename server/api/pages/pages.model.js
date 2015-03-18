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
		default: 'Everyone',
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
	description: String,
	summary: String,
	// galleries: [models.gallerySchema],
	// comments: [{type:Schema.ObjectId, ref: 'Comment'}], 
	// menuId: {type: Schema.ObjectId, ref: 'Menu'},
	meta: Object,
	published: {
		type: Boolean,
		default: false
	},
	likes: Number
});

module.exports = mongoose.model('Pages', PagesSchema);