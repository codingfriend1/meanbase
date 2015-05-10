'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExtensiondataSchema = new Schema({
  name: {
  	type: String,
  	unique: true
  },
  data: Schema.Types.Mixed,
});

module.exports = mongoose.model('Extensiondata', ExtensiondataSchema);