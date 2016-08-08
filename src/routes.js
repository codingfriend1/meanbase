const path = require('path');
const express = require('express');

module.exports = function() {
  const app = this;

  app.use( express.static(app.get('clientPath')) );

  // render home page
  app.get('/themes/*', (req, res) => {
    try {
       var value = path.join(app.get('clientPath'), 'themes', req.params[0]);
       res.send( path.join(app.get('clientPath'), 'themes', req.params[0]) );
     } catch(err) {
       console.log("err", err);
       res.status(500).send(err);
     }
  });

  app.get('/extensions/*', (req, res) => {
    try {
       res.render(path.join(app.get('clientPath'), 'extensions', req.params[0]));
     } catch(err) {
       res.status(500).send(err);
     }
  });

  app.get('/cms/?*', (req, res) => {
    res.sendfile(path.join(app.get('adminPath'), 'index.html'));
  });

  app.get('/*', (req, res) => {
    res.sendfile(path.join(app.get('appPath'), 'index.html'));
  });
};
