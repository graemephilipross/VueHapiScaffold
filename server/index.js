'use strict';

const Glue = require('glue');
const path = require('path');
const appConfig = require('./config/app');
const manifest = require(`./config/${appConfig.hapiManifest.manifest}`);
const jwt = require('./plugins/jwt/index');

const options = {
  preRegister (server, next) {
    server.register(jwt, () => {
      server.auth.strategy('token', 'jwt', true, {});
      next();
    });
  },
  relativeTo: path.join(__dirname, '/plugins')
};

Glue.compose(manifest, options, function (err, server) {
  if (err) {
    throw err;
  }
  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('hapi running');
  });
});
