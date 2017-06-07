'use strict'

import cookies from 'cookies-js'

export default class CSRFTOkenStorage {

  static getToken () {
    return cookies.get('csrfTokenCookie')
  }
}
