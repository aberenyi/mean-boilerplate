var stdio = require('stdio'),
  hashPwd = require('./hashPassword'),
  db = require('./db');

var args = stdio.getopt
({
  db: {key: 'd', description: 'Database to act on', mandatory: true, args: 1},
  uid: {key: 'u', description: 'Username', mandatory: true, args: 1},
  pwd: {key: 'p', description: 'Password', mandatory: true, args: 1},
  groups: {key: 'g', description: 'Group', mandatory: true, multiple: true}
});

var mongo = new db.Mongo(args.db);
mongo.exists('users', {uid: args.uid}, function (exists)
{
  if (exists === false)
  {
    var salt = hashPwd.generateSalt(128),
      groups = typeof args.groups === 'object' ? args.groups : [args.groups];
    mongo.insert
    (
      'users',
      {
        uid: args.uid,
        groups: groups,
        salt: salt,
        hashPwd: hashPwd.hashPassword(salt, args.pwd)
      },
      function(doc)
      {
        if (doc)
        {
          console.log('User ' + args.uid + ' successfully created.');
          mongo.close();
        }
      }
    );
  }
  else
  {
    console.error('User (%s) already exists!', args.uid);
    mongo.close();
  }
});

