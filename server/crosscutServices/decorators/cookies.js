'use strict';

module.exports = (reply, accessToken, csrfToken) => {
  // remove any previous cookies
  reply.unstate('accessTokenCookie');
  reply.unstate('csrfTokenCookie');
  // set cookies
  reply.state('accessTokenCookie', { access_token: accessToken });
  reply.state('csrfTokenCookie', { csrf_token: csrfToken });
};
