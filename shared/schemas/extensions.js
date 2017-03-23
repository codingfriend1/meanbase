const patterns = require('../patterns')
const validators = require('mongoose-validators')

exports.schema = {
  label: {
    type: String,
    required: true,
    trim: true
  },
  html: {
    type: String,
    required: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
  folder: {
    type: String,
    required: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
  contents: {
    type: String,
    required: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
  screenshot: {
    type: String,
    required: false,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
  active: {
  	type: Boolean,
  	default: true
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
};
