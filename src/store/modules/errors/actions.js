'use strict'

import errors from './errorMessages'

const internals = {
  wait: false
}

export default {
  'submitApiResponseError': ({commit}, payload) => {
    if (!internals.wait) {
      internals.wait = true
      const {
        timeout = 5000,
        error: {
          response: {
            status = 'default'
          } = {}
        } = {}
      } = payload
      let message = payload.custom || errors[status] || errors['default']
      commit('update_apiResponseError', message)
      setTimeout(function () {
        commit('update_apiResponseError', '')
        internals.wait = false
      }, timeout)
    }
  },
  'submitApiResponseSuccess': ({commit}, payload) => {
    if (!internals.wait) {
      internals.wait = true
      commit('update_apiResponseSuccess', payload)
      setTimeout(function () {
        commit('update_apiResponseSuccess', '')
        internals.wait = false
      }, 5000)
    }
  }
}
