'use strict';

const appAuthStore = require('../appAuthStore');

exports.appAuthKeyExists = server => {
  // check we have an appAuthKey - if we do assign it to the request header, else 401
  server.ext('onPreAuth', (req, reply) => {
    if (!appAuthStore.appAuthKey) {
      console.log('app is not authorized');
      return reply.error({
        statusCode: 401,
        payload: {
          message: 'Unable to authenticate app',
          code: 'Unauthorized'
        }
      });
    }
    req.headers.Authorization = `Bearer ${appAuthStore.appAuthKey}`;
    return reply.continue();
  });
};
