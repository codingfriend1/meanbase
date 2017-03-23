const patterns = require('../patterns')
const validators = require('mongoose-validators')

exports.schema = {
  author: {
    type: String,
    trim: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
  },
  email: {
    type:String,
    lowercase: true,
    validate: validators.isEmail({skipEmpty:true}),
    trim: true
  },
  website: {
    type: String,
    trim: true,
    lowercase: true,
    validate: validators.isURL({skipEmpty: true})
  },
  title: {
    type: String,
    trim: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: false
  },
  url: {
  	type: String,
  	unique: true,
    required: true,
    trim: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
  preview: {
    type: String,
    required: false
  },
  active: {
  	type: Boolean,
  	required: true,
  	default: false
  },
  templates: {
  	type: Object,
  	required: true,
  	default: {
			"home": ["home"],
			"archive": ["archive"],
			"page": ["page"],
			"article": ["article"],
			"404": ["404"]
  	}
  },
  templatePaths: {
    type: Object,
    required: true,
  },
  extensions: [{
    label: {
      required: true,
      type: String
    },
    html: {
      required: true,
      type: String
    }
  }],
  themeJSONPath: {
    type: String,
    trim: true,
    required: true,
    pattern: patterns.isFilePath,
    patternMessage: patterns.messages.isFilePath
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
};
