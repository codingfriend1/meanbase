'use strict';

const service = require('feathers-mongoose');
const pages = require('./pages-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: pages,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/pages', service(options));

  // Get our initialize service to that we can bind hooks
  const pagesService = app.service('/pages');

  // Set up our before hooks
  pagesService.before(hooks.before);

  // Set up our after hooks
  pagesService.after(hooks.after);
};
