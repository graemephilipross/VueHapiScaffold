/* eslint-disable camelcase */

'use strict';

const upstreamService = require('./services/upstreamRequest');
const replyTokens = require('../../crosscutServices/accessTokens');

// Example 1
exports.loggedIn = function (request, reply) {
  upstreamService.upstreamRequest(`resource/subresource`, 'post', '', request)
  .then(result => {
    if (result.statusCode === 200) {
      return replyTokens.replyWithAccessToken(result, reply, result.body.id, ['dashboardAccess']);
    }
    reply(result.body).code(result.statusCode);
  })
  .catch(() => {
    reply.error({
      statusCode: 500,
      payload: {
        message: 'Something went wrong',
        code: 'InternalServerError'
      }
    });
  });
};

// Example 2
exports.inDashboard = function (request, reply) {
  const session = request.auth.credentials;
  const user = JSON.parse(session.sub).user;
  const payload = {};
  upstreamService.upstreamRequest(`resource/${user}/subresource`, 'post', payload, request)
  .then(result => {
    reply(result.body).code(result.statusCode);
  })
  .catch(() => {
    reply.error({
      statusCode: 500,
      payload: {
        message: 'Something went wrong',
        code: 'InternalServerError'
      }
    });
  });
};
