'use strict';

const service = require('feathers-mongoose');
const sharedContent = require('./shared-content-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: sharedContent,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/shared-content', service(options));

  // Get our initialize service to that we can bind hooks
  const sharedContentService = app.service('/shared-content');

  // Set up our before hooks
  sharedContentService.before(hooks.before);

  // Set up our after hooks
  sharedContentService.after(hooks.after);
};
