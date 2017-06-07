'use strict';

const authService = require('./services/authService');
const atob = require('atob');
const replyTokens = require('../../crosscutServices/accessTokens');

// All requests are expected to send headers:
// X-Crsf-Token
// X-User-Id

/**
 * newScheme constructs an object which implements the hapi auth scheme
 * interface
 */
const newScheme = () => {
  const scheme = {
    authenticate (request, reply) {
      let accessToken;
      return Promise.resolve()
      .then(() => {
        accessToken = request.state.accessTokenCookie.access_token;
        return authService.decodeAccessToken(accessToken);
      })
      .then(decoded => {
        // check crsf matches up with header
        if (decoded.csrfToken !== JSON.parse(atob(request.headers['x-csrf-token'])).csrf_token) {
          return Promise.reject('Invalid csrf token');
        }
        // check user id matches up with header
        const sub = JSON.parse(decoded.sub);
        if (sub.userId !== request.headers['x-user-id']) {
          return Promise.reject('Invalid access token');
        }
        return reply.continue({ credentials: decoded });
      })
      .catch((err) => {
        if (err.name && err.name === 'TokenExpiredError') {
          return authService.decodeAccessTokenNoVerify(accessToken)
          .then(decoded => {
            if (!request.headers['x-user-id'] || !request.headers['x-csrf-token']) {
              return reply({
                code: 'Unauthorized',
                payload: 'Required x-user-id - x-csrf-token headers missing'
              }).code(401);
            }
            return replyTokens.replyWithAccessTokenDecoded(decoded, reply);
          });
        }
        return reply({
          code: 'Unauthorized',
          payload: err || 'Invalid access token'
        }).code(401);
      });
    }
  };
  return scheme;
};

const plugin = {
  register (server, options, next) {
    server.auth.scheme('jwt', newScheme);
    next();
  }
};

plugin.register.attributes = {
  pkg: require('./package.json')
};

module.exports = plugin;
