var mongojs = require('mongojs');

module.exports =
{
  /**
   * Mongo DB connection.
   * @param {string} dbName Database name.
   * @constructor
   */
  Mongo: function (dbName)
  {
    this.mongoDb = mongojs(dbName);
    this.close = function ()
    {
      this.mongoDb.close();
    };

    /**
     * Support 'models'.
     * @param collectionName
     * @returns {*}
     */
    this.model = function(collectionName)
    {
      return this.mongoDb.collection(collectionName);
    };

    /**
     * Find all documents in a collection.
     * @param {string} collectionName Collection name (table name).
     * @param {object} criteria Criteria, (where clause).
     * @param {object} projection Projection (limit, order, etc.).
     * @param {function} callback Callback function.
     */
    this.findAll = function(collectionName, criteria, projection, callback)
    {
      this.mongoDb.collection(collectionName).find(criteria, projection, function (err, docs)
      {
        if (err) throw err;
        callback(docs);
      })
    };

    /**
     * Find a single document in the collection.
     * @param {string} collectionName Collection name (table name).
     * @param {object} criteria Criteria (where clause).
     * @param {object} projection Projection (limit, order, etc.).
     * @param {function} callback Callback function.
     */
    this.findOne = function (collectionName, criteria, projection, callback)
    {
      this.mongoDb.collection(collectionName).findOne(criteria, projection, function (err, doc)
      {
        if (err) throw err;
        callback(doc);
      })
    };

    /**
     * Count documents in a collection.
     * @param {string} collectionName Collection name (table name).
     * @param {string} query Query (where clause).
     * @param {string} callback Callback function.
     */
    this.n = function (collectionName, query, callback)
    {
      this.mongoDb.collection(collectionName).count(query, function (err, count)
      {
        if (err) throw err;
        callback(count);
      });
    };

    /**
     * Check if document exists in collection.
     * @param {string} collectionName Collection name (table name).
     * @param {string} query Query (where clause).
     * @param {string} callback Callback function.
     */
    this.exists = function (collectionName, query, callback)
    {
      this.n(collectionName, query, function (count)
      {
        callback(count === 1);
      })
    };

    /**
     * Add new document to the collection.
     * @param {string} collectionName Collection name (table name).
     * @param {object} doc New document.
     * @param {function} callback Callback function.
     */
    this.insert = function(collectionName, doc, callback)
    {
      this.mongoDb.collection(collectionName).insert(doc, function (err, doc)
      {
        if (err) throw err;
        if (callback) callback(doc);
      });
    };
  },

  /**
   * Convert _id to object id.
   * @param {string} _id Id.
   * @returns {*}
   */
  oid: function(_id)
  {
    return mongojs.ObjectId(_id);
  }
};
