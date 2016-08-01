/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var config = require('./config/environment');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/email/', require('./api/email'));
  app.use('/api/settings', require('./api/settings'));
  app.use('/api/import/', require('./api/import'));
  app.use('/api/development-mode', require('./api/development-mode'));
  app.use('/api/extensions', require('./api/extensions'));
  app.use('/api/shared-content', require('./api/shared-content'));
  app.use('/api/extension', require('./api/extension'));
  app.use('/api/media', require('./api/media'));
  app.use('/api/comments', require('./api/comments'));
  app.use('/api/menus', require('./api/menus'));
  app.use('/api/themes', require('./api/themes'));
  app.use('/api/roles', require('./api/roles'));
  app.use('/api/pages', require('./api/pages'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.route('/themes/*').get(function(req, res) {
    try {
      res.render( path.join(app.get('appPath'), 'themes', req.params[0]) );
    } catch(err) {
      console.log("err", err);
      res.status(500).send(err);
    }
  });

  app.route('/extensions/*').get(function(req, res) {
    try {
      res.render(app.get('appPath') + '/extensions/' + req.params[0]);
    } catch(err) {
      res.status(500).send(err);
    }
  });

  app.route('/ckeditor-browser*').get(function(req, res) {
    console.log('req.query.CKEditorFuncNum', req.query.CKEditorFuncNum);
    res.sendfile(app.get('appPath') + 'components/ckeditor/FileBrowser/index.html');
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets|404)/*')
   .get(errors[404]);

 // app.route('/:url(api|auth|components|app|bower_components|assets|404|missing)/*')
 //    .get(function(req, res) {
 //       res.sendfile(app.get('appPath') + '/app/missing/missing.html');
 //     });
 app.route('/cms/?*')
   .get(function(req, res) {
     res.sendfile(path.join(app.get('adminPath'), 'index.html'));
   });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(path.join(app.get('appPath'), 'index.html'));
    });
};
