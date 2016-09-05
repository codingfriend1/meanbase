'use strict';

const hooks = require('./hooks');

import Mailer from 'feathers-mailer'
import smtpTransport from 'nodemailer-smtp-transport'

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/emails', Mailer(smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })));

  // Get our initialize service to that we can bind hooks
  const emailService = app.service('/emails');

  // Set up our before hooks
  emailService.before(hooks.before);

  // Set up our after hooks
  emailService.after(hooks.after);
};
