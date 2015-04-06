var auth = require('./auth'),
  project = require('../controllers/project');

module.exports = function(app)
{
  app.post('/login', auth.authenticate);
  app.post('/logout', function(req, res)
  {
    req.logout();
    res.end();
  });

  app.get('/api/projects', auth.requiresLogin, project.getProjects);
  //app.get('/api/project/:id', auth.requiresLogin, project.getProject);


  app.get('/partials/*', function(req, res)
  {
    res.render('../../public/app/' + req.params[0]);
  });

  app.get('/', function(req, res)
  {
    res.render('index', {__user: req.user});
  });

  app.all('/api/*', function(req, res)
  {
    res.send(404);
  });

  app.get('*', function(req, res)
  {
    res.redirect('/');
  });
  //app.get('/admin', auth.requiresRole('admin'), ...);
};
