'use strict'

export default {
  en: {
    messages: {
      required: () => {
        return '*'
      },
      confirmed: () => {
        return 'passwords must match'
      },
      email: () => {
        return 'invalid email address'
      },
      digits: () => {
        return 'digits only'
      },
      min: (val, param) => {
        return `at least ${param} characters`
      },
      max: (val, param) => {
        return `${param} digits max`
      },
      numeric: () => {
        return 'digits only'
      },
      regex: () => {
        return 'digits only'
      }
    }
  }
}
