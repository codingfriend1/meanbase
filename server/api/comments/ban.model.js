'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('mongoose-validators');

var BanSchema = new Schema({
  email: {
  	type: String,
    lowercase: true,
    unique: true,
    validate: validators.isEmail({skipEmpty: true})
  },
  ip: {
  	type: String,
    trim: true,
    validate: validators.isIP({skipEmpty: true})
  }
});

module.exports = mongoose.model('Ban', BanSchema);
