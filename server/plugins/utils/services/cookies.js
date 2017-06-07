'use strict';

module.exports = (server) => {
  // define the cookie configuration
  server.state('accessTokenCookie', {
    path: '/',
    ttl: null,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: true, // remove invalid cookies
    strictHeader: false // don't allow violations of RFC 6265
  });

  server.state('csrfTokenCookie', {
    path: '/',
    ttl: null,
    isSecure: false,
    isHttpOnly: false,
    encoding: 'base64json',
    clearInvalid: true, // remove invalid cookies
    strictHeader: false // don't allow violations of RFC 6265
  });
};
