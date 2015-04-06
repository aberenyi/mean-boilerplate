var express = require('express'),
  git = require('git-rev-sync');

var env = process.env.ENV = process.env.ENV || 'dev',
  rev = process.env.REV = git.short();

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/passport')(config);
require('./server/config/routes')(app);

app.listen(config.port);
//TODO: add winston
console.log('Listening on port ' + config.port + '...');
