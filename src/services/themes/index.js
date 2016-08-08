'use strict';

const service = require('feathers-mongoose');
const themes = require('./themes-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: themes,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/themes', service(options));

  // Get our initialize service to that we can bind hooks
  const themesService = app.service('/themes');

  // Set up our before hooks
  themesService.before(hooks.before);

  // Set up our after hooks
  themesService.after(hooks.after);
};
