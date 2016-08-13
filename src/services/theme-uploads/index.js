'use strict';

import ThemeUploadsService from './theme-uploads.service';
const hooks = require('./hooks');
import unzip from '../../hooks/unzip'

module.exports = function() {
  const app = this;

  app.use('/theme-uploads',
    unzip({folderPathProperty: 'themesPath'}),
    new ThemeUploadsService()
  );

  // Get our initialize service to that we can bind hooks
  const themeUploadsService = app.service('/theme-uploads');
  //
  // // Set up our before hooks
  themeUploadsService.before(hooks.before);
  //
  // // Set up our after hooks
  themeUploadsService.after(hooks.after);
};
