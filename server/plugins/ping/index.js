'use strict';

const routes = require('./routes');
const handler = require('./handler');

exports.register = (server, options, next) => {
  server.handler('ping', () => handler.ping);
  routes.registerRoutes(server, options);
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
