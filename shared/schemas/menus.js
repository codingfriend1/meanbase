const patterns = require('../patterns')
const validators = require('mongoose-validators')
const Schema = global.mongoose.Schema

exports.schema = {
  title: {
    type: String,
    trim: true,
    required: true
  },
  url: {
  	type: String,
  	trim: true,
    required: false,
    pattern: patterns.isURI,
    patternMessage: patterns.messages.isURI
  },
  linkTo: {
  	type: String,
  	trim: true,
    required: false
  },
  group: {
  	type: String,
  	trim: true,
    required: true,
  	default: 'main',
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
  },
  position: {
  	type: Number,
  	default: 0,
  },
  isDropdown: {
  	type: Boolean,
  	default: false
  },
  subMenus: {
    type: Schema.Types.Mixed
  },
  classes: {
  	type: String,
  	default: '',
    pattern: patterns.isCSSClass,
    patternMessage: patterns.messages.isCSSClass
  },
  iconClasses: {
  	type: String,
  	default: '',
    pattern: patterns.isCSSClass,
    patternMessage: patterns.messages.isCSSClass
  },
  target: {
  	type: String,
  	default: '',
    pattern: patterns.isAnchorTarget,
    patternMessage: patterns.messages.isAnchorTarget
  },
  published: {
    type: Boolean,
    default: false
  }
};
