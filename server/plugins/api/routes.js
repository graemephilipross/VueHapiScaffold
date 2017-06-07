'use strict';

exports.registerRoutes = (server, options) => {
  // logged in example
  server.route({
    method: 'GET',
    path: '/loggedIn',
    config: {
      auth: { // or false
        strategy: 'token',
        scope: ['dashboardAccess']
      },
      handler: {
        loggedIn: {}
      }
    }
  });
};
