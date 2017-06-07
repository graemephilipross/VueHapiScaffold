'use strict';

const appConfig = require('../../../config/app');
const jwt = require('jsonwebtoken');

class AuthService {

  createAccessToken (options) {
    // additional claims
    const payload = {
      csrfToken: options.csrfToken
    };
    const subject = {
      userId: options.userId,
      id: options.id
    };
    if (options.scope) {
      payload.scope = options.scope;
    }

    return new Promise((resolve, reject) => {
      jwt.sign(payload, appConfig.jwtSecretKey, {
        algorithm: 'HS256',
        expiresIn: '4h',
        // notBefore: '1h',
        subject: JSON.stringify(subject),
        issuer: 'app'
      }, (err, token) => {
        return err ? reject(err) : resolve(token);
      });
    });
  }

  decodeAccessToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, appConfig.jwtSecretKey, (err, token) => {
        return err ? reject(err) : resolve(token);
      });
    });
  }

  decodeAccessTokenNoVerify (token) {
    return new Promise((resolve, reject) => {
      const decoded = jwt.decode(token, {complete: true});
      return resolve(decoded.payload);
    });
  }
}

module.exports = new AuthService();
