'use strict';

// roles-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patterns = require('../../components/patterns');
const validators = require('mongoose-validators');

const rolesSchema = new Schema({
  role: {
  	type: String,
  	required: true,
  	unique: true,
  	trim: true,
    validate: validators.matches(patterns.isTitle)
  },
  permissions: {
  	editContent: {
  		type: Boolean,
      default: false
  	},
  	publishContent: {
  		type: Boolean,
      default: false
  	},
  	deleteContent: {
  		type: Boolean,
      default: false
  	},
  	manageMedia: {
  		type: Boolean,
      default: false
  	},
  	// restrictAccess: {
  	// 	type: Boolean,
   //    default: false
  	// },
  	manageExtensions: {
  		type: Boolean,
      default: false
  	},
  	moderateComments: {
  		type: Boolean,
      default: false
  	},
  	manageUsers: {
  		type: Boolean,
      default: false
  	},
  	manageRoles: {
  		type: Boolean,
      default: false
  	},
  	changeSiteSettings: {
  		type: Boolean,
      default: false
  	},
  	importExportData: {
  		type: Boolean,
      default: false
  	},
    viewAnalytics: {
  		type: Boolean,
      default: false
  	},
    receiveEmails: {
  		type: Boolean,
      default: false
  	},
  	allPrivilages: {
  		type: Boolean,
      default: false
  	}
  }
});

const rolesModel = mongoose.model('roles', rolesSchema);

module.exports = rolesModel;
