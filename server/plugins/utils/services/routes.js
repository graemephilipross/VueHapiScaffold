'use strict';

exports.registerRoutes = (server, options) => {
  server.route({
    method: 'GET',
    path: '/{filename*}',
    config: {
      auth: false
    },
    handler (request, reply) {
      return reply.file('dist/index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/static/{filename*}',
    config: {
      tags: ['api'],
      auth: false
    },
    handler: {
      directory: {
        path: 'dist/static'
      }
    }
  });
};
