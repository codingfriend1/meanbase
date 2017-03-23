const patterns = require('../patterns')

const sitePermissions = [
  'editContent',
  'publishContent',
  'deleteContent',
  'manageMedia',
  'manageExtensions',
  'moderateComments',
  'manageUsers',
  'manageRoles',
  'manageSettings',
  'importExportData',
  'viewAnalytics',
  'receiveEmails'
]

exports.schema = {
  role: {
  	type: String,
  	required: true,
  	unique: true,
  	trim: true,
    pattern: patterns.isTitle,
    patternMessage: patterns.messages.isTitle
  },
  permissions: [{
    type: String,
    enum: sitePermissions
  }],
  createdAt: {
    type: Date,
    'default': Date.now
  },
  updatedAt: {
    type: Date,
    'default': Date.now
  }
};
