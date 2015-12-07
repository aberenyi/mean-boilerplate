'use strict'

var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var db = require('../../_core/db')
var Users = require('../models/Users')
var hashPwd = require('../../_core/hashPassword')

module.exports = function()
{
  passport.use(new localStrategy
  (
    function (username, password, done)
    {
      Users.findOne({uid: username}, {token: 1, salt: 1, hashPwd: 1}, function(err, user)
      {
        if (user && user.token && user.hashPwd === hashPwd.hashPassword(user.salt, password))
        {
          delete user.salt
          delete user.hashPwd
          done(null, user)
        }
        else
        {
          done(null, false);
        }
      });
    }
  ));

  passport.serializeUser(function(user, done)
  {
    if (user) {done(null, user._id);}
  });

  passport.deserializeUser(function(_id, done)
  {
    Users.findOne({_id: db.oid(_id)}, {token: 1}, function(err, user)
    {
      if (err) console.error(err);
      done(null, user ? user : false)
    });
  });
};
