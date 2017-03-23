'use strict';

const service = require('feathers-mongoose');
const models = require('../../../shared/schemas').models
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: models.commments,
    lean: true,
    paginate: {
      default: 30
    }
  };

  // Initialize our service with any options it requires
  app.use('/commments', service(options));

  // Get our initialize service to that we can bind hooks
  const commmentsService = app.service('/commments');

  // Set up our before hooks
  commmentsService.before(hooks.before);

  // Set up our after hooks
  commmentsService.after(hooks.after);
};
