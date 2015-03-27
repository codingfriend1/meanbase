'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MenusSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: true
  },
  url: {
  	type: String,
  	trim: true,
    require: true
  },
  group: {
  	type: String,
  	trim: true,
  	default: 'main'
  },
  position: {
  	type: Number,
  	default: 0,
  },
  classes: {
  	type: String,
  	default: ''
  },
  target: {
  	type: String,
  	default: ''
  }
});

module.exports = mongoose.model('Menus', MenusSchema);