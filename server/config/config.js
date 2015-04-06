var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports =
{
  dev:
  {
    db: 'mongodb://localhost/boilerplate',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  prod:
  {
    //mongolab, etc...
    db: 'mongodb://localhost/boilerplate',
    rootPath: rootPath,
    port: process.env.PORT || 3080
  }
};
