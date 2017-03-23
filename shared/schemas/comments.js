const patterns = require('../patterns')
const validators = require('mongoose-validators')

exports.schema = {
  author: {
    type: String,
    trim: true,
    default: 'anonymous'
  },
  content: {
		type: String,
    trim: true,
		required: true,
    validate: validators.matches(patterns.isText)
  },
  url: {
    type: String,
    validate: validators.matches(patterns.isURI, {skipEmpty: true})
  },
  date: {
  	type: Date,
  	default: Date.now
  },
  email: {
  	type: String,
    lowercase: true,
    validate: validators.isEmail({skipEmpty:true})
  },
  ip: {
  	type: String,
    trim: true,
    validate: validators.isIP({skipEmpty: true})
  },
  gravatar: {
  	type: String,
    validate: validators.matches(patterns.isURI, {skipEmpty: true})
  },
  approved: {
  	type: Boolean,
  	default: false,
  	required: true
  },
  likes: Number,
  meta: Object,
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
};
