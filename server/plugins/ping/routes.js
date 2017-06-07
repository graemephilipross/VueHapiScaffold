'use strict';

exports.registerRoutes = function (server, options) {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: {
      ping: {}
    }
  });
};
