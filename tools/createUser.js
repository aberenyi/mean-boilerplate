'use strict'

var stdio = require('stdio')
var jwt = require('jsonwebtoken')
var hashPwd = require('../_core/hashPassword')
var db = require('../_core/db')
var config = require('../_core/config')

var args = stdio.getopt
({
  db: {key: 'd', description: 'Database to act on', mandatory: true, args: 1},
  uid: {key: 'u', description: 'Username', mandatory: true, args: 1},
  pwd: {key: 'p', description: 'Password', mandatory: true, args: 1},
  groups: {key: 'g', description: 'Group', mandatory: true, multiple: true}
});

var mongo = new db.Mongo(args.db)
var Users = mongo.model('users')
Users.findOne({uid: args.uid}, function(err, user)
{
  if (err) {return console.error('%s', err.toString())}
  if (!user)
  {
    var salt = hashPwd.generateSalt(128)
    var groups = typeof args.groups === 'object' ? args.groups : [args.groups]
    var hashedPwd = hashPwd.hashPassword(salt, args.pwd)
    Users.insert
    (
      {
        uid: args.uid,
        groups: groups,
        salt: salt,
        hashPwd: hashedPwd,
        token: jwt.sign({uid: args.uid}, config.jwtSecret)
      },
      function(err, doc)
      {
        if (err) {return console.error('%s', err.toString())}
        if (doc) {console.log('User ' + args.uid + ' successfully created.')}
        else {console.error('Failed to insert')}
        mongo.close()
      }
    );
  }
  else
  {
    console.error('User (%s) already exists!', args.uid)
    mongo.close();
  }
});

