'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  author: String,
  content: {
		type: String,
		required: true
  },
  date: {
  	type: Date, 
  	default: Date.now
  },
  email: {
  	type: String
  },
  ip: {
  	type: String
  },
  gravatar: {
  	type: String
  },
  approved: {
  	type: Boolean,
  	default: false,
  	required: true
  },
  likes: Number,
  meta: Object
});

module.exports = mongoose.model('Comments', CommentsSchema);