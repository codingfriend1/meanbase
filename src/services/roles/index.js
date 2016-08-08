'use strict';

const service = require('feathers-mongoose');
const roles = require('./roles-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: roles,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/roles', service(options));

  // Get our initialize service to that we can bind hooks
  const rolesService = app.service('/roles');

  // Set up our before hooks
  rolesService.before(hooks.before);

  // Set up our after hooks
  rolesService.after(hooks.after);
};
