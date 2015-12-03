var express = require('express')
var  compress = require('compression')
var bodyParser = require('body-parser')
//var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var morgan = require('morgan')

module.exports = function(app, config)
{
  app
    .set('views', __dirname + '/../views')
    .set('view engine', 'jade')
  app
    .use(compress())
    .use(express.static(__dirname + '/../../public'))
    //.use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    //TODO: add proper secret
    .use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}))
    .use(passport.initialize())
    .use(passport.session())
    .use(morgan('dev'))
}
