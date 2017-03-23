const patterns = require('../patterns')
const validators = require('mongoose-validators')
const Schema = global.mongoose.Schema

exports.schema = {
  contentName: {
  	type: String,
  	unique: true,
  	required: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
  },
  data: Schema.Types.Mixed,
  config: Schema.Types.Mixed,
  type: {
  	type: String,
  	required: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
  }
};
