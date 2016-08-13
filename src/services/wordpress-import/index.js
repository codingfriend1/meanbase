'use strict';

import WordpressImportService from './wordpress-import.service';
const hooks = require('./hooks');
import unzip from './unzip';

module.exports = function() {
  const app = this;

  app.use('/wordpress-import',
    unzip,
    new WordpressImportService()
  );

  // Get our initialize service to that we can bind hooks
  const wordpressImportService = app.service('/wordpress-import');
  //
  // // Set up our before hooks
  wordpressImportService.before(hooks.before);
  //
  // // Set up our after hooks
  wordpressImportService.after(hooks.after);
};
