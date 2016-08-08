const feathers = require('feathers/client')
const socketio = require('feathers-socketio/client');
const hooks = require('feathers-hooks');
const io = require('socket.io-client');
const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication/client');

angular.module('meanbaseApp').factory('feathers', function() {
  const socket = io('http://localhost:3030');

  window.app = feathers()
    .configure(hooks())
    .configure(socketio(socket))
    .configure(authentication({ storage: window.localStorage, localEndpoint: '/api/auth/local', tokenEndpoint: '/api/auth/token' }));

  return app;
});
