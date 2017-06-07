'use strict';

exports.errorDecorator = server => {
  server.decorate('reply', 'error', function (err) {
    if (err.statusCode && err.payload) {
      return this.response(err.payload).code(err.statusCode);
    }
    // fallback to 500 ServerError
    return this.response({
      message: 'Something went wrong',
      code: 'InternalServerError'}
    ).code(500);
  });
};
