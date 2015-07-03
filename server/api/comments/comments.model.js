'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators'),
    textSearch = require('mongoose-text-search');

var CommentsSchema = new Schema({
  author: {
    type: String,
    trim: true,
    default: 'anonymous',
    validate: validators.isTitle()
  },
  content: {
		type: String,
    trim: true,
		required: true,
    validate: validators.isText()
  },
  url: {
    type: String,
    validate: validators.isURI({skipEmpty: true})
  },
  date: {
  	type: Date, 
  	default: Date.now
  },
  email: {
  	type: String,
    lowercase: true,
    validate: validators.isEmail({skipEmpty: true})
  },
  ip: {
  	type: String,
    trim: true,
    validate: validators.isIP({skipEmpty: true})
  },
  gravatar: {
  	type: String,
    validate: validators.isURI({skipEmpty: true})
  },
  approved: {
  	type: Boolean,
  	default: false,
  	required: true
  },
  likes: Number,
  meta: Object
});

// give our schema text search capabilities 
CommentsSchema.plugin(textSearch);
 
// add a text index to the tags array 
CommentsSchema.index({ content: 'text', author: 'text', url: 'text', email: 'text', date: 'text' });

module.exports = mongoose.model('Comments', CommentsSchema);