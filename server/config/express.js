var express = require('express'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  morgan = require('morgan');

module.exports = function(app, config)
{
  app
    .set('views', config.rootPath + '/server/views')
    .set('view engine', 'jade');
  app
    .use(compress())
    .use(express.static(config.rootPath + '/public'))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    //TODO: add proper secret
    .use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}))
    .use(passport.initialize())
    .use(passport.session())
    //TODO: sync morgan with winston
    .use(morgan('dev'));
};
