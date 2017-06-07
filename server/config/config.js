'use strict';

const Confidence = require('confidence');

// cookiePass: 32 char min
// kieron local http://192.168.1.123:8080
const store = new Confidence.Store({
  appAuth: {
    $filter: 'env',
    production: {
      'host': '',
      'clientSecret': '',
      'clientId': ''
    },
    $default: {
      'host': '',
      'clientSecret': '',
      'clientId': ''
    }
  },
  errorProxy: {
    $filter: 'env',
    production: {
      'forwardError': true,
      'host': 'https://logfile.co/api/push/'
    },
    $default: {
      'forwardError': false,
      'host': 'https://logfile.co/api/push/'
    }
  },
  redis: {
    $filter: 'env',
    production: {
      'host': '192.168.1.10',
      'port': '6379'
    },
    $default: {
      'host': '192.168.1.10',
      'port': '6379'
    }
  },
  hapiManifest: {
    $filter: 'env',
    production: {
      'manifest': './glue.manifest.prod'
    },
    $default: {
      'manifest': './glue.manifest.dev'
    }
  },
  apiVersion: 1,
  jwtSecretKey: '5447ca8e35798c8d7683344d10034d6a',
  cookiePass: '5447ca8e35798c8d7683344d10034d6a',
  idealPostcodeBase: 'https://api.ideal-postcodes.co.uk',
  idealPostcodeKey: 'ak_i4pf6v2wjos5CIbzRirpeilvgA8yw'
});

const criteria = {
  env: process.env.NODE_ENV
};

exports.get = function (key) {
  return store.get(key, criteria);
};
