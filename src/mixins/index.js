import _ from 'lodash'
import moment from 'moment'

export default {
  methods: {
    debounce: function (func, wait, immediate) {
      var timeout
      return function () {
        const context = this
        const args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function () {
          timeout = null
          if (!immediate) {
            func.apply(context, args)
          }
        }, wait)
        if (immediate && !timeout) {
          func.apply(context, args)
        }
      }
    },
    throttle: function (callback, limit) {
      let wait = false
      return function () {
        const context = this
        if (!wait) {
          callback.apply(context)
          wait = true
          setTimeout(function () {
            wait = false
          }, limit)
        }
      }
    },
    formatApiDate: function (date) {
      if (date) {
        return moment(date).format('YYYY-MM-DD')
      }
    },
    validateForm: function (promiseFactory) {
      const work = promiseFactory || function () {}
      this.$validator.validateAll()
      .then(() => {
        return work()
      })
      .catch(() => {
        /* required to handle rejection if validation fails
           vaidation errors reported in component
        */
      })
    },
    validateFormDisable: function (promiseFactory, event) {
      const work = promiseFactory || function () {}
      const el = event.target || null
      const elStyles = window.getComputedStyle(el, null)
      const backgroundColor = elStyles.backgroundColor
      const child = el.getElementsByClassName('spinner')[0] || null
      return this.$validator.validateAll()
      .then(() => {
        if (el) {
          el.setAttribute('disabled', true)
          el.style.color = backgroundColor
          el.style.backgroundColor = backgroundColor
        }
        if (child) {
          child.classList.toggle('loading-spinner')
        }
        return work()
      })
      .catch(error => {
        return Promise.resolve(error)
      })
      .then(error => {
        if (_.has(error, 'msg') &&
          error.msg.includes('Validation Failed')) {
          return
        }
        if (el) {
          el.removeAttribute('disabled')
          el.style.color = ''
          el.style.backgroundColor = ''
        }
        if (child) {
          child.classList.toggle('loading-spinner')
        }
      })
    },
    addMonths: function (date, count) {
      if (date && count) {
        let m = null
        const d = (date = new Date(+date)).getUTCDate()

        date.setUTCMonth(date.getUTCMonth() + count, 1)
        m = date.getUTCMonth()
        date.setUTCDate(d)
        if (date.getUTCMonth() !== m) {
          date.setUTCDate(0)
        }
      }
      return date
    },
    isEmptyObject (value) {
      for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false
        }
      }
      return true
    },
    humanize (value) {
      return value.replace(/_{1,}/g, ' ').replace(/(\s{1,}|\b)(\w)/g, (m, space, letter) => {
        return space + letter.toUpperCase()
      })
    }
  }
}
