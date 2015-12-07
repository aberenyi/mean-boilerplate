'use strict'

var jwtSecret = '=5.4Miox.jO^|.4kxM0VJQ*JM!p=%S^Z|;Sw5EhnBKFF-Ypjva.E35tigX~:N-MtMG+6+T!AUkUI2bu-|Am%|VNP8FP.N:d=3f*-=|DS2+9GLtfj:CX_L5EvKs!fzGKr'

/**
 * Common password functions.
 * @module _core/config
 */
var config =
{
  dev:
  {
    jwtSecret: jwtSecret,
    db: 'mongodb://localhost/boilerplate',
    port: process.env.PORT || 3002
  },
  prod:
  {
    jwtSecret: jwtSecret,
    db: 'mongodb://localhost/boilerplate',
    port: process.env.PORT || 3003
  }
}

module.exports = config[process.env.ENV || 'dev']
