const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');
const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication/client');
const rest = require('feathers-rest/client');

angular.module('meanbaseApp').factory('feathers', function() {
  const socket = io(window.location.origin);

  window.app = feathers()
    .configure(hooks())
    // .configure(rest(window.location.origin).jquery(jQuery))
    // .configure(socketio(socket))
    .configure(rest(window.location.origin).fetch(window.fetch.bind(window)))
    .configure(authentication({ storage: window.localStorage, localEndpoint: '/api/auth/local', tokenEndpoint: '/api/auth/token' }));

  return app;
});
