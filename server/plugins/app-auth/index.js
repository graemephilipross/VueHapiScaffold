'use strict';

const authenticateApp = require('./authenticateApp');
const middleware = require('./middleware/appAuthKeyExists');
const decorators = require('./decorators/error');

exports.register = (server, options, next) => {
  decorators.errorDecorator(server);

  authenticateApp.setAppToken()
      .then(() => console.log('app authenticated'))
      .catch(err => console.log(`cannot authenticate app: ${err.stack ? err.stack : err}`));

  middleware.appAuthKeyExists(server);
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
