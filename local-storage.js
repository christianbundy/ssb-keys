'use strict'

function isFunction (f) {
  return typeof f === 'function'
}

module.exports = function (generate) {
  function create (filename, feedType, legacy) {
    var keys = generate(feedType, legacy)
    window.localStorage[filename] = JSON.stringify(keys)
    return keys
  }

  function load (filename) {
    return JSON.parse(window.localStorage[filename])
  }

  return {
    createSync: create,
    create: function (filename, feedType, legacy, cb) {
      if (isFunction(legacy)) {
        cb = legacy
        legacy = null
      }
      if (isFunction(feedType)) {
        cb = feedType
        feedType = null
      }
      cb(null, create(filename, feedType, legacy))
    },
    loadSync: load,
    load: function (filename, cb) {
      cb(null, load(filename))
    }
  }
}
