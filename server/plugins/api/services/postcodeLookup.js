'use strict';

const Wreck = require('wreck');
const appConfig = require('../../../config/app');

exports.postcodeLookup = payload => {
  const postcode = encodeURIComponent(payload.postcode);
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    json: 'force'
  };
  const url = `${appConfig.idealPostcodeBase}/v1/postcodes/${postcode}?api_key=${appConfig.idealPostcodeKey}`;

  return new Promise((resolve, reject) =>
    Wreck.request('get', url, requestOptions, (err, res) => {
      if (err) {
        return reject(err);
      }
      return Wreck.read(res, { json: 'force' }, (error, body) => {
        if (error) {
          return reject(error);
        }
        return resolve({
          statusCode: res.statusCode,
          body
        });
      });
    })
  );
};
