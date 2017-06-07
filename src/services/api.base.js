'use strict'

import axios from 'axios'
import config from 'appConfig'
import csrfStorage from './csrfToken.storage'
import userIdStorage from './userId.storage'
import circuitBreaker from './circuitBreaker'

const options = {
  gracePeriodMs: 5000,
  threshold: 5
}
const breaker = circuitBreaker(axios.request, options)

const getPayload = (method, data) =>
  (method !== 'get' || method !== 'delete') && data instanceof Object
  ? data
  : ''

const buildQueryString = object => {
  const pairs = []
  Object.keys(object).forEach(key => {
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]))
  })
  return pairs.join('&')
}

const getUrl = (resource, method, data) => {
  if ((method === 'get' || method === 'delete') && data !== {}) {
    resource += '?' + buildQueryString(data)
  }
  return resource
}

const fireBreaker = (req, errCallBack) => {
  return breaker(req)
    .catch(error => {
      if (error.response.status === 401) {
        // redirection
        errCallBack()
      }
      return Promise.reject(error)
    })
}

export default (errCallBack = () => {}) => {
  return (resource, method, data) => {
    const req = {
      method,
      url: getUrl(resource, method, data),
      headers: {
        'Content-Type': 'application/json'
      },
      data: getPayload(method, data),
      baseURL: config.baseURL
    }

    // Only set headers if properties exist
    const userId = userIdStorage.getUserId()
    if (userId) {
      req.headers['X-User-Id'] = userId
    }

    const csrfToken = csrfStorage.getToken()
    if (csrfToken) {
      req.headers['X-Csrf-Token'] = csrfToken
    }
    return fireBreaker(req, errCallBack)
  }
}
