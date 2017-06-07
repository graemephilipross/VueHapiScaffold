'use strict';

const routes = require('./routes');
const handler = require('./handler');
const preResponse = require('./middleware/preResponse');

exports.register = (server, options, next) => {
  preResponse.define(server);
  require('./services/apiErrorEmitter');

  // Example
  server.handler('loggedIn', () => handler.loggedIn);

  routes.registerRoutes(server, options);
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
