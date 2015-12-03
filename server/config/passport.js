'use strict'

var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var db = require('../../_core/db')

var Users = require('../models/Users')
var Projects = require('../models/Projects')
var hashPwd = require('../../_core/hashPassword')

module.exports = function()
{
  passport.use(new localStrategy
  (
    function (username, password, done)
    {
      //'initial' login (i.e. before page refresh)
      Users.findOne({uid: username}, {limit: 1}, function(err, user)
      {
        if (user && user.hashPwd === hashPwd.hashPassword(user.salt, password))
        {
          delete user.salt;
          delete user.hashPwd;
          Projects.find({groups: {$in: user.groups}}, {}, function(err, projects)
          {
            user.projects = projects;
            done(null, user)
          });
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
    if (user)
    {
      done(null, user._id);
    }
  });

  //make sure we keep the user logged in after a page refresh
  passport.deserializeUser(function(_id, done)
  {
    Users.findOne({_id: db.oid(_id)}, {uid: 1, groups: 1}, function(err, user)
    {
      if (err) console.error(err);
      Projects.find({groups: {$in: user.groups}}, {}, function(err, projects)
      {
        user.projects = projects;
        return (user)
          ? done(null, user)
          : done(null, false);
      });
    });
  });
};
