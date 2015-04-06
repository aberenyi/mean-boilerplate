var config = require('../config/config')[process.env.ENV],
  db = require(config.rootPath + 'core/db');

var mongo = new db.Mongo(config.db);
module.exports = mongo.model('projects');
