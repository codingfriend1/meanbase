'use strict';

const service = require('feathers-mongoose');
const extensions = require('./extensions-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: extensions,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/extensions', service(options));

  // Get our initialize service to that we can bind hooks
  const extensionsService = app.service('/extensions');

  // Set up our before hooks
  extensionsService.before(hooks.before);

  // Set up our after hooks
  extensionsService.after(hooks.after);
};
