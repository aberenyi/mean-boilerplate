'use strict'

/**
 * Common password functions.
 * @module _core/config
 */
var config =
{
  dev:
  {
    db: 'mongodb://localhost/boilerplate',
    port: process.env.PORT || 3002
  },
  prod:
  {
    //mongolab, etc...
    db: 'mongodb://localhost/boilerplate',
    port: process.env.PORT || 3003
  }
}

module.exports = config[process.env.ENV || 'dev']
