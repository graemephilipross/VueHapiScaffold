'use strict';

const aguid = require('aguid');
const authService = require('../plugins/jwt/services/authService');
const replyCookies = require('./decorators/cookies');

const constructOptions = ({userId, id}, scope) => {
  const options = {
    csrfToken: aguid(),
    userId,
    id
  };
  if (scope && scope instanceof Array) {
    options.scope = scope.slice();
  }
  return options;
};

exports.replyWithAccessToken = (result, reply, user, scope = null) => {
  const userId = user || '';
  const id = result.body.id || '';
  const options = constructOptions({
    userId: userId.toString(),
    id: id.toString()
  }, scope);
  return Promise.resolve()
  .then(() => authService.createAccessToken(options))
  .then(accessToken => {
    replyCookies(reply, accessToken, options.csrfToken);
    return reply(Object.assign({}, {userId: user}, result.body)).code(result.statusCode);
  });
};

exports.replyWithAccessTokenDecoded = (decoded, reply) => {
  const sub = JSON.parse(decoded.sub);
  const options = constructOptions(sub, decoded.scope);
  return Promise.resolve()
    .then(() => authService.createAccessToken(options))
    .then(newAccessToken => Promise.all([
      Promise.resolve(newAccessToken),
      authService.decodeAccessToken(newAccessToken)
    ]))
    .then(([newAccessToken, newDecoded]) => {
      // remove previous cookies
      replyCookies(reply, newAccessToken, options.csrfToken);
      return reply.continue({ credentials: newDecoded });
    });
};
