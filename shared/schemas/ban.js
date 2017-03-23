const patterns = require('../patterns')
const validators = require('mongoose-validators')

exports.schema = {
  email: {
  	type: String,
    lowercase: true,
    unique: true,
    validate: validators.isEmail({skipEmpty:true})
  },
  ip: {
  	type: String,
    trim: true,
    validate: validators.isIP({skipEmpty: true})
  }
};
