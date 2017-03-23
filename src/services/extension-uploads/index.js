'use strict';

import ExtensionUploadsService from './extension-uploads.service';
const hooks = require('./hooks');
import unzip from '../../hooks/unzip'

module.exports = function() {
  const app = this;

  app.use('/extension-uploads',
    unzip({folderPathProperty: 'extensionsPath', setProperty: 'extensionUrl'}),
    new ExtensionUploadsService()
  );

  // Get our initialize service to that we can bind hooks
  const extensionUploadsService = app.service('/extension-uploads');
  //
  // // Set up our before hooks
  extensionUploadsService.before(hooks.before);
  //
  // // Set up our after hooks
  extensionUploadsService.after(hooks.after);
};
