'use strict';

const Wreck = require('wreck');
const appConfig = require('../../../config/app');
const authAppService = require('../../app-auth/authenticateApp');
const eventBus = require('./eventBus');
const appAuthStore = require('../../app-auth/appAuthStore');

let inFlightAuthRequest = null;

const requestNewToken = () => {

  if (!inFlightAuthRequest) {
    inFlightAuthRequest = () => authAppService.setAppToken();
  }

  return inFlightAuthRequest()
    .then(() => {
      inFlightAuthRequest = null;
      return Promise.resolve(appAuthStore.appAuthKey);
    })
    .catch(err => {
      inFlightAuthRequest = null;
      console.log(`cannot authenticate app: ${err.stack ? err.stack : err}`);
      return Promise.reject();
    });
};

const sendRequest = (url, method, requestOptions) =>
  new Promise((resolve, reject) =>
    Wreck.request(method, url, requestOptions, (err, res) => {
      if (err) {
        return reject(err);
      }
      return Wreck.read(res, { json: 'force' }, (error, body) => {
        if (error) {
          return reject(error);
        }
        return resolve({
          statusCode: res.statusCode,
          body,
          request: requestOptions.payload !== '' ? JSON.parse(requestOptions.payload) : '',
          url
        });
      });
    })
);

exports.upstreamRequest = (urlExt, method, payload, req) => {

  const getPayload = object => {
    return (method !== 'get' || method !== 'delete') && object instanceof Object ? JSON.stringify(object) : '';
  };

  const buildQueryString = object => {
    const pairs = [];

    Object.keys(object).forEach(key => {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
    });
    return pairs.join('&');
  };

  const getUrl = (resource, method, payload) => {
    let url = `${appConfig.oubSystem.host}/${resource}`;

    if ((method === 'get' || method === 'delete') && payload !== '') {
      url += '?' + buildQueryString(payload);
    }

    return url;
  };

  const makeRequest = token => {
    const url = getUrl(urlExt, method, payload);
    const apiVerion = process.env.API_VERSION || appConfig.oubSystem.apiVersion;
    const requestOptions = {
      headers: {
        // Set Accept
        Accept: `application/vnd.oub.api+json;version=${apiVerion}`,
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : req.headers.Authorization
      },
      payload: getPayload(payload),
      json: 'force',
      rejectUnauthorized: false // remove once upstream server is configured
    };

    return sendRequest(url, method, requestOptions);
  };

  return makeRequest()
    .then(res => {
      if (res.statusCode && res.statusCode >= 500) {
        eventBus.emit('apiError', res);
      }

      if (res.statusCode && res.statusCode === 401) {
        return requestNewToken()
          .then(token => {
            return makeRequest(token);
          });
      }
      return res;
    })
    .catch(err => {
      console.log(`Error with upstreamRequest: ${err.stack ? err.stack : err}`);
      return Promise.reject(err);
    });
};
