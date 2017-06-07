'use strict';

const config = require('./config.js');
const creds = config.get('/appAuth');
const apiVersion = config.get('/apiVersion');
const cookiePass = config.get('/cookiePass');
const idealPostcodeKey = config.get('/idealPostcodeKey');
const idealPostcodeBase = config.get('/idealPostcodeBase');
const apiErrorProxy = config.get('/errorProxy');
const redis = config.get('/redis');
const jwtSecretKey = config.get('/jwtSecretKey');
const hapiManifest = config.get('/hapiManifest');

module.exports = {
  'oubSystem': {
    'host': creds.host,
    'clientSecret': creds.clientSecret,
    'clientId': creds.clientId,
    apiVersion
  },
  'errorProxy': {
    'forwardError': apiErrorProxy.forwardError,
    'host': apiErrorProxy.host
  },
  'redis': {
    'host': redis.host,
    'port': redis.port
  },
  'hapiManifest': {
    'manifest': hapiManifest.manifest
  },
  cookiePass,
  jwtSecretKey,
  idealPostcodeKey,
  idealPostcodeBase
};
