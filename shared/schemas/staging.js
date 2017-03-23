const patterns = require('../patterns')
const validators = require('mongoose-validators')
const Schema = global.mongoose.Schema

exports.schema = {
  belongsTo: { type: String, required: false, trim: true, default: '' },
  key: { type: String, required: true},
  data: Schema.Types.Mixed,
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
};

exports.indexBy = {belongsTo: 1, key: 1};
