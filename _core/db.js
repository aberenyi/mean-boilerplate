'use strict'

var mongojs = require('mongojs')

/**
 * Common DB functions
 * @module _core/db
 */
module.exports =
{
  /**
   * Mongo DB connection.
   * @param {string} dbName Database name.
   * @constructor
   */
  Mongo: function(dbName)
  {
    this.mongoDb = mongojs(dbName)
    this.close = function ()
    {
      this.mongoDb.close()
    }

    /**
     * Support 'models'.
     * @param collectionName
     * @returns {*}
     */
    this.model = function (collectionName)
    {
      return this.mongoDb.collection(collectionName)
    }
  },

  /**
   * Convert _id to object id.
   * @param {string} _id Id.
   * @returns {*}
   */
  oid: function(_id)
  {
    return mongojs.ObjectId(_id)
  }
}
