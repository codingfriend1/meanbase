const patterns = require('../patterns')
const validators = require('mongoose-validators')

exports.schema = {
  url: {
		type: String,
		required: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
	},
  filename: {
    type: String,
		required: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
	alt: {
		type: String,
		trim: true,
		default: '',
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
	},
	attribute: {
		type: String,
		trim: true,
		default: '',
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
	},
	groups: [{
		type: String,
		trim: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
	}],
	galleries: [{
		type: String,
		trim: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
	}],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
};
