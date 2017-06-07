'use strict';

const authCookies = require('./services/cookies');
const staticRoutes = require('./services/routes');

exports.register = (server, options, next) => {
  authCookies(server);
  staticRoutes.registerRoutes(server, options);
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
