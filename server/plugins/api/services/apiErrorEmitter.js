'use strict';

const eventBus = require('./eventBus');
const Wreck = require('wreck');
const appConfig = require('../../../config/app');

class ApiError {
  constructor () {
    eventBus.on('apiError', (error) => {
      this.handle(error);
    });
  }

  handle (error) {
    if (!appConfig.errorProxy.forwardError) {
      return;
    }
    this.makeRequest(error)
    .catch(err => {
      console.log(`Unable to send ApiError request: ${err.stack ? err.stack : err}`);
    });
  }

  makeRequest (error) {
    const url = appConfig.errorProxy.host;
    const method = 'post';
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      payload: this.getPayload(error),
      json: 'force'
    };
    return this.sendRequest(url, method, requestOptions);
  };

  getPayload ({statusCode, body, request, url}) {
    const error = Object.keys(body).map((key) => {
      return {
        [key]: body[key]
      };
    });

    return {
      message: body.message || url,
      statusCode,
      error,
      request
    };
  };

  sendRequest (url, method, requestOptions) {
    return new Promise((resolve, reject) => {
      Wreck.request(method, url, requestOptions, (err, res) => {
        if (err) {
          return reject(err);
        }
        return Wreck.read(res, { json: 'force' }, (error, body) => {
          if (error) {
            return reject(error);
          }
          return resolve(body);
        });
      });
    });
  };
};

module.exports = new ApiError();
