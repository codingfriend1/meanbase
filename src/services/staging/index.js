'use strict';

const service = require('feathers-mongoose');
const staging = require('./staging-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: staging,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/staging', service(options));

  // Get our initialize service to that we can bind hooks
  const stagingService = app.service('/staging');

  // Set up our before hooks
  stagingService.before(hooks.before);

  // Set up our after hooks
  stagingService.after(hooks.after);
};
