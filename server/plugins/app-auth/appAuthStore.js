'use strict';

class AppAuthStore {
  constructor () {
    this._appAuthKey = null;
  }

  get appAuthKey () {
    return this._appAuthKey;
  }

  set appAuthKey (value) {
    this._appAuthKey = value;
  }
}

// singleton
module.exports = new AppAuthStore();
