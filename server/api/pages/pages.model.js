'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
		patterns = require('../../components/patterns'),
    validators = require('mongoose-validators'),
    textSearch = require('mongoose-text-search');


var PagesSchema = new Schema({
	url: {
		type: String,
		unique: true,
		trim: true,
		required: true,
    validate: validators.matches(patterns.isURI)
	},
	template: {
		type: String,
		required: true,
		trim: true,
		validate: validators.matches(patterns.isTitle)
	},
	visibility: {
		type: String,
		default: 'basic',
		trim: true,
		validate: validators.matches(patterns.isTitle,{skipEmpty:true})
	},
	editability: {
		type: String,
		trim: true,
		validate: validators.matches(patterns.isTitle,{skipEmpty:true})
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	author: {
		type: String,
		validate: validators.matches(patterns.isTitle, {skipEmpty:true})
	},
	tabTitle: {
		type: String,
		trim: true,
		validate: validators.matches(patterns.isTitle, {skipEmpty:true})
	},
	title: {
		type: String,
		trim: true,
		default: "Title",
		validate: validators.matches(patterns.isTitle, {skipEmpty:true})
	},
	content: [
		{location: {type: String}, text: {type: String}}
	],
	images: [{
	  url: {
			type: String,
			required: true,
			validate: validators.matches(patterns.isFilePath)
		},
		alt: {
			type: String,
			trim: true,
			default: '',
			validate: validators.matches(patterns.isText, {skipEmpty: true})
		},
		attribute: {
			type: String,
			trim: true,
			default: '',
			validate: validators.matches(patterns.isText, {skipEmpty: true})
		},
		location: {
			type: String,
			required: true,
			validate: validators.matches(patterns.isTitle)
		}
	}],
	extensions: [
		{
			name: {
				type: String,
				required: true,
				validate: validators.matches(patterns.isTitle)
			},
		  group: {
		  	type: String,
		  	required: true,
				validate: validators.matches(patterns.isTitle)
		  },
		  position: Number,
		  text: {
		  	type: String,
		  	required: true,
		  	validate: validators.matches(patterns.isHTML)
		  },
		  contentName: {
		  	type: String,
				validate: validators.matches(patterns.isTitle, {skipEmpty:true})
		  },
		  config: Schema.Types.Mixed,
		  data: Schema.Types.Mixed
		}
	],
	description: {
		type: String,
		required: false,
		validate: validators.matches(patterns.isText, {skipEmpty: true})
	},
	summary: {
		type: String,
		required: false,
		validate: validators.matches(patterns.isText, {skipEmpty: true})
	},
	meta: Object,
	published: {
		type: Boolean,
		default: false
	},
	likes: Number
});

// give our schema text search capabilities
PagesSchema.plugin(textSearch);

// add a text index to the tags array
PagesSchema.index({
	"$**": "text"
});

module.exports = mongoose.model('Pages', PagesSchema);
