'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');


var PagesSchema = new Schema({
	url: {
		type: String,
		unique: true,
		trim: true,
		required: true,
    validate: validators.isURI()
	},
	template: {
		type: String,
		required: true,
		trim: true,
		validate: validators.isTitle()
	},
	visibility: {
		type: String,
		default: 'basic',
		trim: true,
		validate: validators.isTitle({skipEmpty: true})
	},
	editability: {
		type: String,
		trim: true,
		validate: validators.isTitle({skipEmpty: true})
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
		validate: validators.isTitle({skipEmpty: true})
	},
	tabTitle: {
		type: String,
		trim: true,
		validate: validators.isTitle({skipEmpty: true})
	},
	title: {
		type: String,
		trim: true,
		default: "Title",
		validate: validators.isTitle({skipEmpty: true})
	},
	content: {
		type: Object,
		default: {}
	},
	images: [{
	  url: {
			type: String,
			required: true,
			validate: validators.isFilePath()
		},
		alt: {
			type: String,
			trim: true,
			default: '',
			validate: validators.isText({skipEmpty: true})
		},
		attribute: {
			type: String,
			trim: true,
			default: '',
			validate: validators.isText({skipEmpty: true})
		},
		location: {
			type: String,
			required: true,
			validate: validators.isTitle()
		}
	}],
	extensions: [
		{
			name: {
				type: String,
				required: true,
				validate: validators.isTitle()
			},
		  group: {
		  	type: String,
		  	required: true,
				validate: validators.isTitle()
		  },
		  position: Number,
		  text: {
		  	type: String,
		  	required: true,
		  	validate: validators.isHTML()
		  },
		  useShared: {
		  	type: Boolean,
		  	default: false
		  },
		  sharedSource: {
		  	type: String,
				validate: validators.isTitle({skipEmpty: true})
		  },
		  config: Schema.Types.Mixed,
		  data: Schema.Types.Mixed
		}
	],
	description: {
		type: String,
		required: false,
		validate: validators.isText({skipEmpty: true})
	},
	summary: {
		type: String,
		required: false,
		validate: validators.isText({skipEmpty: true})
	},
	meta: Object,
	published: {
		type: Boolean,
		default: false
	},
	likes: Number
});

module.exports = mongoose.model('Pages', PagesSchema);