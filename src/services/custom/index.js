'use strict';

const service = require('feathers-mongoose');
const models = require('../../../shared/schemas').models
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: models.custom,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/customs', service(options));

  // Get our initialize service to that we can bind hooks
  const customService = app.service('/customs');

  // Set up our before hooks
  customService.before(hooks.before);

  // Set up our after hooks
  customService.after(hooks.after);
};
