const patterns = require('../patterns')
const validators = require('mongoose-validators')
const Schema = global.mongoose.Schema

exports.schema = {
  belongsTo: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  enabled: {
		type: Boolean,
		default: false
	},
  value: Schema.Types.Mixed,
  permission: {
    type: String
  },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
};

exports.indexBy = {belongsTo: 1, key: 1}
