'use strict';

const EventEmitter = require('events');

class EventBus extends EventEmitter {
  constructor () {
    super();
  }
};

module.exports = new EventBus();
