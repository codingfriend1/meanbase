'use strict';

const service = require('feathers-mongoose');
const comments = require('./comments-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: comments,
    lean: true
  };

  // Initialize our service with any options it requires
  app.use('/comments', service(options));

  // Get our initialize service to that we can bind hooks
  const commentsService = app.service('/comments');

  // Set up our before hooks
  commentsService.before(hooks.before);

  // Set up our after hooks
  commentsService.after(hooks.after);
};
