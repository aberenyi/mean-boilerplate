var express = require('express');

var env = process.env.ENV = process.env.ENV || 'dev';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/passport')(config);
require('./server/config/routes')(app);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
