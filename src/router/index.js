import Vue from 'vue'
import Router from 'vue-router'
import Error404 from 'components/Error404'

// import * as guards from './navigationGuards'

/* const Example = resolve => {
  require.ensure(['components/example'], () => {
    resolve(require('components/example'))
  }, 'example')
} */

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/error',
      name: 'error',
      component: Error404
    }
  ]
})
