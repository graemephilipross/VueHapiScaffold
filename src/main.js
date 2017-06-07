// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// required for vuex to run on ie10
import 'es6-promise/auto'

import 'reset-css/reset.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './markdown.theme.js'
import './validation'
import VueClipboards from 'vue-clipboards'
// import VueAnalytics from 'vue-analytics'

Vue.config.main = process.env.MAIN

/* if (Vue.config.main !== 'staging') {
  Vue.use(VueAnalytics, {
    id: '',
    router
  })
} */

Vue.use(VueClipboards)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
