'use strict'

var passport = require('passport')
var jwt = require('express-jwt')
var config = require('../../_core/config')

/**
 * Make sure that the token is
 */
var requiresLogin = jwt({secret: config.jwtSecret})

module.exports =
{
  authenticate: authenticate,
  requiresLogin: requiresLogin
}

/**
 * Check user credentials during the login procedure
 * @param req
 * @param res
 * @param next
 */
function authenticate(req, res, next)
{
  var auth = passport.authenticate('local', function(err, user)
  {
    if (err) {return next(err);}
    if (!user) {res.send({success: false})}
    req.logIn(user, function(err)
    {
      if (err) {return next(err);}
      res.send({success: true, user: user});
    })
  });
  auth(req, res, next);
}
