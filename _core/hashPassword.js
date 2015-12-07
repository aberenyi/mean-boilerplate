'use strict'

var crypto = require('crypto')
var base64url = require('base64url')

/**
 * Common password functions.
 * @mixin
 * @alias core/hashPassword
 */
module.exports =
{
  /**
   * Generate Salt.
   * @param {number} size Length of the generated salt.
   * @returns {string}
   */
  generateSalt: function(size)
  {
    return base64url(crypto.randomBytes(size));
  },

  /**
   * Hash a given password with a given salt (SHA256).
   * @param {string} salt Salt.
   * @param {string} pwd Password.
   * @returns {string}
   */
  hashPassword: function(salt, pwd)
  {
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(pwd).digest('hex');
  }
};
