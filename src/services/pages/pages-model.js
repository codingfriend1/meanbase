'use strict';

// pages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');
const textSearch = require('mongoose-text-search');

const pagesSchema = new Schema({
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
	author: {
		type: String,
		validate: validators.matches(patterns.isTitle, {skipEmpty:true})
	},
	tabTitle: {
		type: String,
		trim: true
		// validate: validators.matches(patterns.isTitle, {skipEmpty:true})
	},
	title: {
		type: String,
		trim: true,
		default: "Title"
		// validate: validators.matches(patterns.isTitle, {skipEmpty:true})
	},
	content: { type: Schema.Types.Mixed },
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
  lists: {
    type: Object,
    default: {}
  },
  links: {
    type: Object,
    default: {}
  },
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
	likes: Number,
  publishedOn: { type: Date, 'default': Date.now },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
}, { minimize: false });

pagesSchema.plugin(textSearch);

pagesSchema.index({
	"$**": "text"
});

const pagesModel = mongoose.model('pages', pagesSchema);

module.exports = pagesModel;
