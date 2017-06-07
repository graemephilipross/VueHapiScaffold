'use strict';

exports.define = server => {
  server.ext('onPreResponse', (req, reply) => {
    // catch 403 dashboard access from boom
    if (req.response.isBoom &&
        req.response.output.statusCode === 403) {
      return reply.error({
        statusCode: 401,
        payload: {
          message: 'User not authorized to access resource',
          code: 'Unauthorized'
        }
      });
    }
    return reply.continue();
  });
};
