import moment from 'moment'

const DEPRECATION_MESSAGE = 'isSameUser and isSameDay should be imported from the utils module instead of using the props functions'

export function isSameDay (currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false
  }

  let currentCreatedAt = moment(currentMessage.createdAt)
  let diffCreatedAt = moment(diffMessage.createdAt)

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day')
}

export function isSameUser (currentMessage = {}, diffMessage = {}) {
  return !!(diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id)
}

export function warnDeprecated (fn) {
  return (...args) => {
    console.warn(DEPRECATION_MESSAGE)
    return fn(...args)
  }
}

export function isSameInterval (currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false
  }

  let currentCreatedAt = moment(currentMessage.createdAt)
  let diffCreatedAt = moment(diffMessage.createdAt)

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false
  }

  return Math.abs(currentCreatedAt.diff(diffCreatedAt, 'seconds')) < 300
}

export function displayTimeString (at) {
  let d = moment(at)

  return d.calendar(null, {
    sameDay: 'HH:mm',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'YYYY[年]M[月]D[日] HH:mm',
    sameElse: 'YYYY[年]M[月]D[日] HH:mm'
  })
}
