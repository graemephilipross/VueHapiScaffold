'use strict'

export const createLeadGuard = (to, from, next) => {
  if (notCreated(next)) {
    next()
  }
}

function notCreated (next) {
  return true
}
