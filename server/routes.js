/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/themes', require('./api/themes'));
  app.use('/api/roles', require('./api/roles'));
  app.use('/api/pages', require('./api/pages'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets|404)/*')
  //  .get(errors[404]);

 app.route('/:url(api|auth|components|app|bower_components|assets|404)/*')
    .get(function(req, res) {
       res.sendfile(app.get('appPath') + '/app/404/404.html');
     });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
