const path = require('path');
const express = require('express');

module.exports = function() {
  const app = this;

  app.set('view engine', 'jade');
  app.use( express.static(app.get('clientPath')) );

  if(process.env.NODE_ENV !== 'production') {
    app.set('seed', false);
    app.set('reset-seed', true);
  }

};
