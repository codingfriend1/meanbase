'use strict';

import 'babel-preset-es2017/polyfill';

const seed = require('./components/seed');
const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const settings = require('./components/settings');
const routes = require('./routes');

const api = feathers();

api.configure(configuration(path.join(__dirname, '..')));

api.use(compress())
  .options('*', cors())
  .use(cors())
  // .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  // .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(rest())
  .configure(socketio())
  .use(function(req, res, next) {
    req.feathers.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
  })
  .configure(hooks())
  .configure(settings)
  .configure(services)
  .configure(seed)
  .configure(middleware);

const app = feathers()
  .configure(configuration(path.join(__dirname, '..')))
  .configure(settings)
  .use('/api', api)
  .configure(routes)


app.set('view engine', 'jade');

module.exports = app;
