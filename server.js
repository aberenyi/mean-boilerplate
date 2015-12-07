'use strict'

var express = require('express');

var app = express();
var config = require('./_core/config')
require('./server/config/express')(app, config)
require('./server/config/passport')(config)
require('./server/config/routes')(app)
app.listen(config.port)
console.log('Listening on port ' + config.port + '...')

//TODO: check whether this is working or not...
process.on('uncaughtException', function(err)
{
  console.log(err);
});
