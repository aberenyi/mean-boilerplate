'use strict'

var auth = require('./auth')
var project = require('../controllers/project')
var user = require('../controllers/user')

module.exports = function(app)
{
  //unprotected routes
  app.post('/login', auth.authenticate);
  app.post('/logout', function(req, res)
  {
    req.logout();
    res.end();
  });

  app.get('/partials/*', function(req, res)
  {
    res.render('../../public/app/' + req.params[0]);
  });

  app.get('/', function(req, res)
  {
    //res.render('index', {__user: req.user});
    res.render('index');
  });

  //protected routes
  app.use('/api/*', auth.requiresLogin);
  app.get('/api/me', user.getUser)
  app.get('/api/projects', project.getProjects);
  app.all('/api/*', function(req, res)
  {
    res.send(404);
  });

  //catch all route
  app.get('*', function(req, res)
  {
    res.redirect('/');
  });

  //error handling
  app.use(function(err, req, res, next)
  {
    var msg = 'Uh-oh, something went wrong.'
    if (err.name === 'UnauthorizedError')
    {
      msg = 'Soz, your token is invalid.'
    }
    res.status(401).send(msg);
  })
};
