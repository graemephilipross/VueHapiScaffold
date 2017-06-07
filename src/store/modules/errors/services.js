'use strict'

import Vue from '../../../main'
import apiFactory from '../../../services/api.base'

const api = apiFactory(() => {
  Vue.$router.push({name: ''})
})

// example
export const example = payload => api('api/example', 'post', payload)
