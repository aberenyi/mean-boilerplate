var config = require('../../_core/config')
var db = require('../../_core/db')

var mongo = new db.Mongo(config.db)
module.exports = mongo.model('projects')
