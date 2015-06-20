'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DevelopmentModeSchema = new Schema({
  theme: Boolean,
  extension: Boolean
});

module.exports = mongoose.model('DevelopmentMode', DevelopmentModeSchema);