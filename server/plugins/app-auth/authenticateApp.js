'use strict';

const Wreck = require('wreck');
const appConfig = require('../../config/app');
const appAuthStore = require('./appAuthStore');

exports.setAppToken = () => {
  const url = `${appConfig.oubSystem.host}/token`;
  const apiVerion = process.env.API_VERSION || appConfig.oubSystem.apiVersion;

  const payload = JSON.stringify({
    client_id: appConfig.oubSystem.clientId,
    client_secret: appConfig.oubSystem.clientSecret
  });

  const requestOptions = {
    headers: {
      // Set Accept
      Accept: `application/vnd.oub.api+json;version=${apiVerion}`,
      'Content-Type': 'application/json'
    },
    payload,
    json: 'force',
    rejectUnauthorized: false // remove once upstream server is configured
  };

  const request = new Promise((resolve, reject) =>
    Wreck.post(url, requestOptions, (err, res, payload) => {
      if (err) {
        return reject(err);
      }
      if (res.statusCode > 200) {
        return reject(res);
      }
      return resolve(payload);
    })
);

  return request.then(payload => {
    appAuthStore.appAuthKey = payload.access_token;
    return appAuthStore.appAuthKey;
  });
};
