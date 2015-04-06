var stdio = require('stdio'),
  db = require('../core/db');

var args = stdio.getopt
({
  db: {key: 'd', description: 'Database to act on', mandatory: true, args: 1},
  url: {key: 'u', description: 'Project\'s URL', mandatory: true, args: 1},
  groups: {key: 'g', description: 'Group', mandatory: true, multiple: true}
});

var mongo = new db.Mongo(args.db);
mongo.exists('projects', {url: args.url}, function(exists)
{
  if (exists === false)
  {
    var groups = typeof args.groups === 'object' ? args.groups : [args.groups];
    mongo.insert
    (
      'projects',
      {
        url: args.url,
        groups: groups
      },
      function(doc)
      {
        if (doc)
        {
          console.log('Project (%s) successfully created.', args.url);
          mongo.close();
        }
      }
    );
  }
  else
  {
    console.error('Update');
    mongo.close();
  }
});

