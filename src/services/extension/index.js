'use strict';

const service = require('feathers-mongoose');
const extension = require('./extension-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: extension,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/extension', service(options));

  // Get our initialize service to that we can bind hooks
  const extensionService = app.service('/extension');

  // Set up our before hooks
  extensionService.before(hooks.before);

  // Set up our after hooks
  extensionService.after(hooks.after);
};
