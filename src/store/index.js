import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import errors from './modules/errors/errors'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    errors
  }
})
