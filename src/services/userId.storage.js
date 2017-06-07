'use strict'

export default class UserIdStorage {

  static setUserId (value) {
    localStorage.setItem('userId', value)
  }

  static getUserId () {
    return localStorage.getItem('userId')
  }

  static remove () {
    localStorage.removeItem('userId')
  }
}
