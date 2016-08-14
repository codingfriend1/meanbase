'use strict';

const service = require('feathers-mongoose');
const custom = require('./custom-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: custom,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/custom', service(options));

  // Get our initialize service to that we can bind hooks
  const customService = app.service('/custom');

  // Set up our before hooks
  customService.before(hooks.before);

  // Set up our after hooks
  customService.after(hooks.after);
};
